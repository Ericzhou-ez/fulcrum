import React, { useState, useRef, FormEvent } from "react";
import "../styles/authentication.css";
import Nav from "../components/core/nav";
import Footer from "../components/core/footer";
import FooterName from "../assets/images/footerName.svg";
import { Typography } from "@mui/material";
import { useAuth } from "../contexts/user-context";
import { useNavigate } from "react-router-dom";
import { uploadProfilePic } from "../utils/uploadProfilePicture";
import Loading from "../components/core/loading";

interface SignInPageProps {
   theme: any;
   handleToggleTheme: () => void;
   isModalOpen: boolean;
   toggleModal: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({
   theme,
   handleToggleTheme,
   isModalOpen,
   toggleModal,
}) => {
   const { googleSignIn, emailSignIn, emailSignUp, completeProfile } =
      useAuth();
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isUserSigningUp, setIsUserSigningUp] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
   const [isProcessing, setIsProcessing] = useState(false);
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
   const [profilePicPreview, setProfilePicPreview] = useState("");
   const [footerHeight, setFooterHeight] = useState(0);
   const imgRef = useRef<HTMLImageElement | null>(null);
   const isDark = theme.palette.mode === "dark";
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const file = e.target.files[0];
         setProfilePicFile(file);
         setProfilePicPreview(URL.createObjectURL(file));
      }
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");
      setIsProcessing(true);
      try {
         if (isUserSigningUp) {
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
               throw new Error("请输入有效的邮箱地址。");
            }
            if (!password || password.length < 6) {
               throw new Error("密码至少需要6个字符。");
            }
            if (!firstName || !lastName) {
               throw new Error("名字和姓氏为必填项。");
            }
   
            await emailSignUp(email, password);
            setSuccessMessage("注册成功，正在完善资料…");
            let photoURL = "";
            if (profilePicFile) {
               photoURL = await uploadProfilePic(profilePicFile);
            } else {
               photoURL = profilePicPreview; 
            }
            await completeProfile({ firstName, lastName, photo: photoURL });
            setSuccessMessage("资料更新成功！");
            navigate("/dashboard");
         } else {
            // Sign in mode.
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
               throw new Error("请输入有效的邮箱地址。");
            }
            if (!password || password.length < 6) {
               throw new Error("密码至少需要6个字符。");
            }
            await emailSignIn(email, password);
            setSuccessMessage("登录成功！");
            navigate("/dashboard");
         }
      } catch (err) {
         setErrorMessage(
            err instanceof Error ? err.message : "发生了意外错误。"
         );
      } finally {
         setIsProcessing(false);
      }
   };

   return (
      <React.Fragment>
         <div
            style={{
               position: "relative",
               zIndex: 10,
               marginBottom: `${footerHeight}px`,
               backgroundColor: "var(--background-color)",
            }}
         >

            <Nav
               isModalOpen={isModalOpen}
               toggleModal={toggleModal}
               home={true}
               navOpen={false}
               setNavOpen={null}
               overlay={false}
               setOverlay={() => {}}
               searchBar={false}
            />
            <div className="auth">
               <Typography
                  variant="h1"
                  sx={{
                     fontWeight: "600",
                     fontSize: {
                        xs: "2.8rem",
                        sm: "3rem",
                        md: "3.5rem",
                        lg: "4rem",
                     },
                     textAlign: "center",
                     marginBottom: "50px",
                  }}
               >
                  {isUserSigningUp ? "创建账户" : "欢迎回来"}
               </Typography>
               <form onSubmit={handleSubmit}>
                  <div className="email-signin-input">
                     <label>邮箱</label>
                     <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
                  <div className="password-signin-input">
                     <label>密码</label>
                     <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  {isUserSigningUp && (
                     <>
                        <div className="email-signin-input">
                           <label>名字</label>
                           <input
                              type="text"
                              required
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                           />
                        </div>
                        <div className="email-signin-input">
                           <label>姓氏</label>
                           <input
                              type="text"
                              required
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                           />
                        </div>
                        <div className="profile-pic-input">
                           <label>上传头像（可选）</label>
                           <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                           />
                           {profilePicPreview && (
                              <img
                                 src={profilePicPreview}
                                 alt="头像预览"
                                 style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    marginTop: "10px",
                                    objectFit: "cover",
                                 }}
                              />
                           )}
                        </div>
                     </>
                  )}
                  {errorMessage && (
                     <p className="error-message">{errorMessage}</p>
                  )}
                  {successMessage && (
                     <p className="success-message">{successMessage}</p>
                  )}
                  <button
                     className="signin-btn"
                     type="submit"
                     disabled={isProcessing}
                     style={{
                        backgroundColor: isProcessing ? "#ccc" : "",
                        cursor: isProcessing ? "not-allowed" : "pointer",
                     }}
                  >
                     {isUserSigningUp ? "注册" : "登录"}
                  </button>
               </form>
               <p>
                  {isUserSigningUp ? "已经有账号了？" : "还没有账号？"}
                  <strong>
                     <span
                        onClick={() => {
                           setIsUserSigningUp(!isUserSigningUp);
                           setIsProcessing(false);
                        }}
                        style={{
                           cursor: "pointer",
                           textDecoration: "underline",
                           marginLeft: "8px",
                        }}
                     >
                        {isUserSigningUp ? "登录" : "注册"}
                     </span>
                  </strong>
               </p>
               <button
                  className="google-signin"
                  onClick={async () => {
                     try {
                        await googleSignIn();
                        navigate("/dashboard");
                     } catch (err) {
                        setErrorMessage(
                           err instanceof Error
                              ? err.message
                              : "发生了意外错误。"
                        );
                     }
                  }}
               >
                  使用 Google 继续
               </button>
            </div>
            <div style={{ padding: "0 16px" }}>
               <Footer theme={theme} handleToggleTheme={handleToggleTheme} />
            </div>
         </div>
         <div
            style={{
               width: "100%",
               height: `${footerHeight}px`,
               position: "fixed",
               bottom: 0,
               zIndex: 0,
               overflow: "hidden",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: isDark ? "#380e05" : "#fff2d8",
            }}
         >
            <img
               ref={imgRef}
               src={FooterName}
               alt="Fulcrums"
               className="footer-bold-name"
               style={{
                  width: "100%",
                  objectFit: "cover",
               }}
               onLoad={() => {
                  if (imgRef.current) {
                     setFooterHeight(imgRef.current.clientHeight);
                  }
               }}
            />
         </div>
      </React.Fragment>
   );
};

export default SignInPage;
