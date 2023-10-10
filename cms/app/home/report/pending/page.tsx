'use client'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Space, Table, Tag, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import FindAllPendingReport from '@api/report/FindAllPendingReport.gql'
import UpdateReport from '@api/report/UpdateReport.gql'
import { useEffect, useState } from 'react';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const map: any = {
  'PENDING': '待处理',
  'RESOLVED': '已处理'
}



const App: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(FindAllPendingReport);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [rowsData, setRowsData] = useState([])
  const [updateReport] = useMutation(UpdateReport)
  const handle = async (id: number) => {
    updateReport({ variables: { id, status: 'RESOLVED' } })
    refetch()

  }
  const unHandle = (id: number) => {
    updateReport({ variables: { id, status: 'REJECTED' } })
    refetch()
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns: ColumnsType<DataType> = [
    {
      title: '贴文',
      dataIndex: 'content',
      key: 'content',
      width: 500,
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
    },
    {
      title: '举报原因',
      dataIndex: 'reason',
      key: 'reason',
      width: 300,
    },
    {
      title: '举报用户',
      dataIndex: 'reporter',
      key: 'reporter',
      width: 100,
    },
    {
      title: '被举报贴文ID',
      dataIndex: 'postId',
      key: 'postId',
      width: 200,
    },
    {
      title: '被举报用户',
      dataIndex: 'reported',
      key: 'reported',
      width: 120,
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 150,
      render: (status: string) => {
        const color = status === 'PENDING' ? 'orange' : 'blue'
        return (
          <Tag color={color}>
            {map[status]}
          </Tag >
        );
      },
    },
    {
      title: '举报时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      sorter: (a: any, b: any) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
      render: (data) => {
        const dt = new Date(data)
        let formattedDateTime = dt.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        formattedDateTime = formattedDateTime.replace(/-/g, ':');
        return <div>{formattedDateTime}</div>
      },
    },
    {
      title: '处理',
      key: 'action',
      render: ({ id }) => {
        return <Space size="middle">
          <button onClick={(e) => {
            handle(id)
          }}>处理 </button>
          <Button type='dashed' onClick={(e) => {
            unHandle(id)
          }}>不处理 </Button>
        </Space>
      }
    },
  ];
  useEffect(() => {
    if (!loading) setRowsData(data?.findAllPendingReport)
  }, [data])


  return (
    <div>
      <Table rowSelection={rowSelection} rowKey={'id'} columns={columns} dataSource={rowsData} />
    </div>
  )
};

export default App;
