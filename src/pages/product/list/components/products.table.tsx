import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC, useEffect, useState } from "react";
import Product from "../../../../components/content/product.content";

interface ProductTable {
    list: any[];
    loading?: boolean;
}

type TableRecord = {
    key: React.Key;
    product: {
        sku: string;
        name: string;
        variantName: string;
    },

}

const ProductsTable: FC<ProductTable> = ({ list, loading }) => {

    const [dataSource, setDataSource] = useState<TableRecord[]>([]);

    const columns: ColumnsType<TableRecord> = [
        {
            title: 'Product',
            dataIndex: 'product',
            render: (cellData) => (<Product
                content={
                    {
                        sku: cellData.sku,
                        name: cellData.name,
                        variantName: cellData.variantName
                    }
                }
                image={{
                    src: cellData.image
                }}
            />)
        },
        {
            title: 'In Stock',
            dataIndex: 'inStock'
        },
        {
            title: 'Notes',
            dataIndex: 'notes'
        }
    ]

    const createDataSource = (list: any[]) => {
        return list.map(item => ({
            key: item.id,
            product: {
                sku: item.sku,
                name: item.name,
                variantName: item.variant_name,
                image: item.image_url
            },
            inStock: item.in_stock,
            note: item.note
        }) as TableRecord);
    }

    useEffect(() => {
        const dataSource = createDataSource(list);
        setDataSource(dataSource);
    }, [list]);
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            loading={loading}
        />
    )
}

export default ProductsTable;