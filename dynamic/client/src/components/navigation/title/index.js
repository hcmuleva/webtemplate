import { useLink } from "@refinedev/core";
import { Logo } from "./styled";
import { BikeWhiteIcon, FineFoodsIcon } from "../icons";
import { theme,Avatar } from "antd";

const { useToken } = theme;



export const Title = ({ collapsed }) => {
    const { token } = useToken();
    const Link = useLink();
    return (
        <Logo>
            <Link to="/">
            <Avatar
          src={"logo.jpg"} // Replace with the actual path to your logo image
          size={64} // Set the size of the Avatar (adjust as needed)
          style={{
            background: "#f0f2f5", // Set the background color if required
           
          }}
        />
                {/* {collapsed ? (
                    <BikeWhiteIcon
                        style={{
                            fontSize: "32px",
                            color: token.colorTextHeading,
                        }}
                    />
                ) : (
                    <FineFoodsIcon style={{ color: token.colorTextHeading }} />
                )} */}
            </Link>
        </Logo>
    );
};