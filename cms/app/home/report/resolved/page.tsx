'use client'
import { useQuery } from '@apollo/client';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import FindAllReport from '@api/report/FindAllReport.gql'
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
  'RESOLVED': '已处理',
  'REJECTED': '不处理'
}

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
    render: (status: string) => {
      const color = status === 'RESOLVED' ? 'green' : 'blue'
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
    render: (data) => {
      return <div>{data}</div>
    },
  },
  // {
  //   title: '处理',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <Button type='dashed'>处理 </Button>
  //       <Button type='dashed'>不处理 </Button>
  //     </Space>
  //   ),
  // },
];


const App: React.FC = () => {
  const { loading, error, data } = useQuery(FindAllReport);
  const [rowsData, setRowsData] = useState([])
  useEffect(() => {
    if (!loading) setRowsData(data?.findAllReport)
  }, [data])

  return (
    <div>
      <Table rowKey={'id'} columns={columns} dataSource={rowsData} />
    </div>
  )
};

export default App;
