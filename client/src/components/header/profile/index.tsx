import { Button, Drawer, Form, Input } from "antd";
import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { editUserFetch, logoutFetch } from "../../../api";
import { IStore } from "../../../models/redux.interfaces";
import { logIn, logOut } from "../../../redux/reducers/user";
import "./profile.scss";

interface IProfile {
  visible: boolean;
  closeWindow: () => void;
}

const Profile = ({ visible, closeWindow }: IProfile) => {
  const [isFormChanged, setIsFormChanged] = useState(false);
  const user = useSelector((store: IStore) => store.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [avatarUpload, setAvatarUpload] = useState({
    preview: user.img,
    visible: !user.img,
  });

  const logout = () => {
    dispatch(logOut());
    logoutFetch();
    setIsFormChanged(false);
    closeWindow();
    setAvatarUpload({
      preview: undefined,
      visible: false,
    });
  };

  const onClose = () => {
    setAvatarUpload({ ...avatarUpload, visible: false });
  };

  const onCrop = (preview: any) => {
    setAvatarUpload({ ...avatarUpload, preview: preview });
  };

  const onBeforeFileLoad = (elem: any) => {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const changeAvatar = () => {
    setAvatarUpload({ ...avatarUpload, visible: true });
  };

  const editProfile = (form: any) => {
    editUserFetch({ ...form, img: avatarUpload.preview });
    dispatch(
      logIn({
        authorized: true,
        username: user.username,
        img: avatarUpload.preview,
        ...form,
      })
    );
  };

  useEffect(() => {
    setAvatarUpload({ preview: user.img, visible: !user.img });
  }, [user]);

  return (
    <Drawer visible={visible} onClose={closeWindow} width={640}>
      <p className="profile__title" style={{ marginBottom: 24 }}>
        {t("profile.title")}
      </p>
      {user.authorized && (
        <Form
          layout="vertical"
          onFinish={editProfile}
          onChange={() => setIsFormChanged(true)}
        >
          <div className="profile__container">
            <div className="profile__leftBlock">
              <DescriptionItem
                title={t("login.username")}
                content={user.username}
              />
              <Form.Item
                label={t("profile.firstName")}
                name="firstName"
                initialValue={user.firstName}
                rules={[
                  { required: true, message: t("profile.firstNameChecker") },
                ]}
              >
                <Input
                  placeholder={t("profile.firstName")}
                  defaultValue={user.firstName}
                />
              </Form.Item>
              <Form.Item
                label={t("profile.secondName")}
                name="secondName"
                initialValue={user.secondName}
                rules={[
                  { required: true, message: t("profile.secondNameChecker") },
                ]}
              >
                <Input
                  placeholder={t("profile.secondName")}
                  defaultValue={user.secondName}
                />
              </Form.Item>
              <Form.Item
                label={t("profile.phone")}
                name="phone"
                initialValue={user.phone}
                rules={[
                  {
                    required: true,
                    message: t("profile.phoneChecker"),
                  },
                ]}
              >
                <Input
                  placeholder={t("profile.phone")}
                  defaultValue={user.phone}
                />
              </Form.Item>
            </div>
            <div className="profile__rightBlock">
              {avatarUpload.visible ? (
                <Avatar
                  width={200}
                  height={200}
                  onCrop={onCrop}
                  onClose={onClose}
                  onBeforeFileLoad={onBeforeFileLoad}
                />
              ) : (
                <div className="avatarEditor__container" onClick={changeAvatar}>
                  <img
                    src={avatarUpload.preview}
                    alt="Avatar"
                    className="avatarEditor__image"
                  />
                  <div className="avatarEditor__middle">
                    <div className="avatarEditor__text">
                      {t("profile.changeAvatar")}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="profile__btnBlock">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isFormChanged}
              >
                {t("common.update")}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={logout} danger>
                {t("common.logout")}
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

const DescriptionItem = ({ title, content }: any) => (
  <div className="profile__description">
    <p>{title}:&nbsp;</p>
    {content}
  </div>
);

export default Profile;
