


import { Image, Typography } from 'antd';
import { FC } from 'react';
import FallBackImage from '../../assests/images/fallback.png'


type SizeType = 'md' | 'lg' | 'xl' | 'xxxl';

interface ProductInterface {
    image: {
        src: string;
        fallBackSize?: SizeType,
        size?: SizeType,
        fitSize?: boolean;
        hide?: boolean;
        preview?: boolean;
    }
    content: NameSkuContentInterface,
    block?: boolean;
    wrapperClassName?: string;
    align?: 'center' | 'start' | 'end'
    wrap?: boolean;
}

const Product: FC<ProductInterface> = ({ block = false, wrap = true, align = 'center', image: { src, fallBackSize = 'md', size = 'md', fitSize = true, hide = false, preview = true }, content, wrapperClassName = '' }) => {
    const displayType = block ? 'flex' : 'inline-flex';
    const imageFit = fitSize ? 'img-fit-aspect-ration' : '';
    const wrapClass = wrap ? 'text-wrap text-break' : '';

    return (<>
        <div
            className={`col-gap-2 ${wrapperClassName}`}
            style={{
                display: displayType
            }}
        >
            {!hide && (<div>
                <Image
                    rootClassName={`thumbnail-frame thumbnail-frame-default-${fallBackSize} ${'thumbnail-frame-' + size}`}
                    className={`${imageFit} w-auto`}
                    src={src}
                    fallback={FallBackImage}
                    preview={preview}
                />
            </div>)}
            <div className={`${wrapClass}`}>
                <NameSkuContent
                    {...content}
                />
            </div>
        </div>
    </>)
}

export interface NameSkuContentInterface {
    name: string;
    sku: string;
    variantName: string;
}

export const NameSkuContent: FC<NameSkuContentInterface> = ({
    name,
    sku,
    variantName,
}) => {
    return (
        <>
            <div
            //   className={`sku-name-variant ${wrapperClassName}`}
            //   style={{
            //     textAlign: "start",
            //     fontSize: "var(--xs-font-size)",
            //     ...wrapperStyle,
            //   }}
            >
                <div>
                    <Typography.Text strong> {sku}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>{name}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>{variantName}</Typography.Text>
                </div>
            </div>
        </>
    );
};

export default Product;