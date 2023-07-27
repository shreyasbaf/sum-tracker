import { Typography, theme } from 'antd';
import { BaseType } from 'antd/es/typography/Base';
import { CSSProperties, FC, ReactNode } from 'react';
const { useToken } = theme;


interface HeadingInterface {
    children: ReactNode;
    wrapperStyle?: CSSProperties;
    titleStyle?: CSSProperties;
    titleLevel?: 1 | 2 | 3 | 4 | 5;
    titleClassName?: string;
    warapperClassName?: string;
}

const Heading: FC<HeadingInterface> = ({
    children,
    wrapperStyle = {},
    titleStyle = {},
    titleLevel = 4,
    warapperClassName = '',
    titleClassName = '',
}) => {
    const { token } = useToken();
    return (
        <div
            style={{ ...wrapperStyle }}
            className={warapperClassName}
        >
            <Typography.Title
                level={titleLevel}
                style={{ color: token.colorPrimary, marginBottom: '0px', marginTop: '0px', ...titleStyle }}
                className={titleClassName}
            >
                {children}
            </Typography.Title>
        </div>
    );
};

export default Heading;
