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
            <Avatar src={"logo.png"} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}/>
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