import {FC, useEffect, useState} from "react";
import {GetStaticProps} from "next";
import {promises as fs} from "fs";
import {FOOTER_FILE, MENUS_FILE} from "../../constants/file-paths";
import Menus from "../../dtos/Menus.dto";
import FooterDefinition from "../../dtos/Footer.dto";
import MainLayout from "../../components/MainLayout";
import { useSelector } from "react-redux";
import {RootState} from "../../redux/store";
import {useRouter} from "next/router";
import {infoToast} from "../../utils/toasts";
import ProfilePageWrapper from "../../styled/Profile.styled";
import ShadowCard from "../../styled/ShadowCard";
import Text from "../../styled/Text";
import Button from "../../styled/Button";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import CorneredBox from "../../components/CorneredBox";

interface ProfilePageProps{
    menus: Menus;
    footer: FooterDefinition;
}

const ProfilePage: FC<ProfilePageProps> = ({menus, footer}) => {

    const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
    const router = useRouter();
    const [edit, setEdit] = useState<boolean>(false);

    console.log(loggedInUser);

    useEffect(function (){
        if(!loggedInUser){
            router.push("/").then(() => {
                infoToast("Cannot access profile page without logging in");
            });
        }
    });

    const handleEditSubmit = (data: any) => {
        console.log(data);
        setEdit(false);
    }

    return(
        <MainLayout
            menus={menus}
            headerBgColorBack="skyBlue"
            footer={footer}
        >
            { !edit ? <ProfilePageWrapper style={{
                width: "auto"
            }}>
                <ShadowCard style={{
                    width: "350px"
                }}>
                    <div className="row d-flex flex-column p-4" style={{
                        minWidth: "350px"
                    }}>
                        <Text fontSize="xl" weight="bold"> {loggedInUser?.name} </Text>

                        <div className="d-flex mt-2">
                            <img src={"/icons/mail_icon_gray.svg"} width="20" height="20" alt={"email"}/>
                            <Text fontSize="md" className="ml-2"> {loggedInUser?.email} </Text>
                        </div>

                        <div className="d-flex mt-2">
                            <img src={"/icons/phone_black.svg"} width="20" height="20" alt={"email"}/>
                            <Text fontSize="md"
                                  className="ml-2"> +{loggedInUser?.country_code} {loggedInUser?.mobile} </Text>
                        </div>

                        <div className="d-flex mt-2">
                            <img src={"/icons/location.svg"} width="20" height="20" alt={"email"}/>
                            <Text fontSize="md" className="ml-2"> {loggedInUser?.city}, {loggedInUser?.state} </Text>
                        </div>

                        <hr className="mt-4 mb-2" style={{
                            width: "100%",
                            color: "gray"
                        }}/>

                        <div className="d-flex mt-2">
                            <img src={"/icons/office.svg"} width="20" height="20" alt={"email"}/>
                            <Text fontSize="md"
                                  className="ml-2"> {loggedInUser?.company ? loggedInUser?.company : "Individual"} </Text>
                        </div>

                        <div className="d-flex mt-2">
                            <img src={"/icons/document.svg"} width="20" height="20" alt={"email"}/>
                            <Text fontSize="md"
                                  className="ml-2"> GST: {loggedInUser?.gst ? loggedInUser?.gst : "Not Provided"} </Text>
                        </div>


                        <Button size={"md"} rounded={true} className="w-50 mt-4" onClick={() => setEdit(true)}>
                            Edit Profile
                        </Button>

                    </div>
                </ShadowCard>
            </ProfilePageWrapper> : <CorneredBox
                bgColor="white"
                bgColorBack="secondary"
                paddingTop="20px"
                paddingBottom="70px"
            >
                <div className="container">
                    <EditUserForm cb={handleEditSubmit} />
                </div>

            </CorneredBox>}
        </MainLayout>
    );
}



export const getStaticProps: GetStaticProps = async () => {
    // fetch menus
    const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
    const menus: Menus = JSON.parse(menuData);

    const footerData = await fs.readFile(FOOTER_FILE, { encoding: "utf-8" });
    const footer: FooterDefinition = JSON.parse(footerData);

    return {
        props: {
            menus,
            footer,
        },
    };
};

export default ProfilePage;