import React, { useState } from "react"; //, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import CircularProgress from "../circular-progress/circular-progress.component";
import { ReactComponent as UserIcon } from "../../assets/user.svg";

import {
  selectCurrentUserAvatar,
  selectCurrentUserId
} from "../../redux/user/user.selectors";
import { selectAvatarLoading } from "../../redux/account/account.selectors";
import { updateAvatarStart } from "../../redux/user/user.action";
import { storage } from "../../firebase/firebase.utils";

import {
  UploadImageContainer,
  InputFileContainer,
  LableFileContainer,
  ButtonsContainer,
  AvatarContainer,
  ImageContainer,
  ImageContainerBorder
} from "./upload-image.styles";

const UploadImage = ({
  currentUserAvatar,
  currentUserId,
  imageType,
  updateAvatarStart,
  avatarLoading
}) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [url, setUrl] = useState(undefined);
  let fileInput = React.createRef();

  const handleFileChange = event => {
    // const file = fileInput.current.files[0]; // this is if we want to use refs instead of state to save the image file before uploading it
    if (event.target.files.length > 1)
      return alert("plese choose just one file");
    const eventFile = event.target.files[0];
    setImage(eventFile);
  };

  const handleFileUpload = () => {
    if (image) {
      if (/\.(jpe?g|png|gif)$/i.test(image.name)) {
        // here we check with a RegEx if the file type is authorized
        const imageSize = image.size / 1024 / 1024;
        if (imageSize > 1)
          return alert(
            `image file is ${imageSize} MB and the maximun file size is 1 MB`
          );
        const storageRef = storage.ref(`${currentUserId}`); // we create the storage reference object seting the name of the folder where we want to save our
        const imageFile = storageRef.child(`${imageType}`); // we create the image file
        const uploadTask = imageFile.put(image); // we create a task (function) to upload the image to the file. it returns an object that can be used to monitor and manage the upload (an observable)
        const unsubscribe = uploadTask.on("state_changed", {
          // we start an observable that has one event listener, on state_changed of the task and 3 functions, one while it is in progress, one when an error happens and the last when the upload is finished
          next: snapshot => {
            // this is if we want to present a progress bar
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(percent);
            setLoading(true);
          },
          error: error => {
            console.log(error);
            unsubscribe(); // we close the observable connection once there is an error or the upload is finished
          },
          complete: async () => {
            // await imageFile.getDownloadURL().then(url => setUrl(url)); // once the file is updloaded we get the download url
            await imageFile
              .getDownloadURL()
              .then(url => updateAvatarStart(url)); // we could have just triggered the action to update the avatar url in the db and in the redux here and we have not need to create the url and setUrl useState neither the useEffect | in this case we use currentUser.avatarUrl for rendering the img
            setLoading(false);
            setImage(null);
            unsubscribe();
          }
        });
      } else {
        return alert(`image file type is not suported`);
      }
    } else {
      return alert("select an image first");
    }
  };

  // useEffect(() => {
  //   // we need to use useEffect to launch the user action because set functions from useState work as setState asynchronously so we cannot launch the action just after using the set function but when the value is updated
  //   if (url) {
  //     // checking that url is different than the initial value (in this case undefined) makes the useEffect to behave like ComponentDidUpdate only and not also as ComponentDidMount
  //     updateAvatarStart(url);
  //   }
  // }, [updateAvatarStart, url]);

  return (
    <UploadImageContainer>
      {loading || avatarLoading ? (
        <AvatarContainer>
          <CircularProgress
            radius={35}
            progress={progress}
            color={"black"}
            backgroundColor={"transparent"}
          />
        </AvatarContainer>
      ) : currentUserAvatar !== "" ? (
        <ImageContainerBorder>
          <ImageContainer src={currentUserAvatar} alt={"avatar"} />
        </ImageContainerBorder>
      ) : (
        <AvatarContainer>
          <UserIcon />
        </AvatarContainer>
      )}
      <ButtonsContainer>
        <InputFileContainer
          type="file"
          id="file"
          ref={fileInput}
          onChange={handleFileChange}
          style={{ alignSelf: "flex-start" }}
        />
        <LableFileContainer htmlFor="file">
          Choose your profile image
        </LableFileContainer>
        <CustomButton inverted type="button" onClick={handleFileUpload}>
          UPLOAD IMAGE
        </CustomButton>
      </ButtonsContainer>
    </UploadImageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserAvatar: selectCurrentUserAvatar,
  currentUserId: selectCurrentUserId,
  avatarLoading: selectAvatarLoading
});

const mapDispatchToProps = dispatch => ({
  updateAvatarStart: avatarUrl => dispatch(updateAvatarStart(avatarUrl))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadImage);
