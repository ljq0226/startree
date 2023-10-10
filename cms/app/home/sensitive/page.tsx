'use client'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Space, Table, Tag, Button, message, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import FindAllWords from '@api/sensi/FindAllWords.gql'
import CreateWords from '@api/sensi/CreateWords.gql'
import DeleteWord from '@api/sensi/DeleteWord.gql'
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
  const { loading, error, data, refetch } = useQuery(FindAllWords);
  const [word, setWord] = useState('')
  const [deleteWord] = useMutation(DeleteWord)
  const [rowsData, setRowsData] = useState([])
  const [createWord] = useMutation(CreateWords)
  const handleDelete = async (id: number) => {
    await deleteWord({ variables: { id } })
    refetch()
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: '敏感词',
      dataIndex: 'word',
      key: 'word',
      width: 300,
    },
    {
      title: '处理',
      key: 'action',
      render: ({ id }) => {
        return <Space size="middle">
          <Button type='dashed' onClick={(e) => {
            e.preventDefault()
            handleDelete(id)
          }}>删除 </Button>
        </Space>
      }
    },
  ];
  useEffect(() => {
    if (!loading) setRowsData(data?.findAllWords)
  }, [data])
  useEffect(() => {
    refetch()
  }, [])

  return (
    <div>
      <Input value={word} onChange={(e) => setWord(e.target.value)} placeholder='请输入新增敏感词' />
      <Button onClick={async () => {
        await createWord({ variables: { word } })
        await refetch()
        message.success('新增成功!')
      }}>新增</Button>
      <Table rowKey={'id'} columns={columns} dataSource={rowsData} />
    </div>
  )
};

export default App;
