import React, { useState } from 'react'
import { Button, Modal, Tabs, message } from 'antd'
import { useMutation } from '@apollo/client'
import CreateReport from '@api/report/CreateReport.gql'
import { PostStore } from '@/store'

const ReportData = [
  {
    label: '违法信息',
    key: '1',
    children: [
      '涉枪爆刀',
      '售卖考试答案',
      '非法荐股',
      '毒品',
      '售卖个人信息',
      '赌博',
      '其他违禁品',
      '假证假票',
      '诈骗',
    ],
  },
  {
    label: '侵犯个人权益',
    key: '2',
    children: [
      '泄露隐私',
      '内容挱袭',
      '其他侵权行为',
    ],
  },
  {
    label: '饭圈违规',
    key: '3',
    children: [
      '互撕谩骂',
      '造谣爆料',
      '刷量控评',
      '诱导集资',
      '侵犯隐私',
    ],
  },
  {
    label: '不良价值导向',
    key: '4',
    children: [
      '不良价值导向',
    ],
  },
  {
    label: '不实信息',
    key: '5',
    children: [
      '冒充新闻当事方',
      '造谣传谣',
      '其他不实信息',
    ],
  },
  {
    label: '涉未成年人',
    key: '6',
    children: [
      '低俗软色情',
      '诱导不良行为',
      '伤害未成年人',
    ],
  },
  {
    label: '违规营销',
    key: '7',
    children: [
      '标题党、带节奏',
      '垃圾信息',
      '违规有奖活动',
      '其他营销信息',
    ],
  },
  {
    label: '涉企侵权',
    key: '8',
    children: [
      '企业权益投诉',
    ],
  },
  {
    label: '涉黄信息',
    key: '11',
    children: [
      '色情导流',
      '色情視频',
      '低俗信息',
      '招媒信息',
      '色情图文'],
  },
  {
    label: '有害信息',
    key: '12',
    children: [
      '邪救',
      '宗教民族问题',
      '侮辱英烈',
      '虐杀动物',
      '𣆂恐血腥',
      '其他有害信息',
      '历史處无主义'],
  },
  {
    label: '网络暴力',
    key: '13',
    children: [
      '网暴我',
      '网暴他人',
    ],
  },
  {
    label: '人身攻击',
    key: '14',
    children: [
      '不友善言论',
      '侮辱谩骂',
      '宣扬仇恨与歧视',
      '其他攻击行为',
    ],
  },
]

function ReportModal() {
  const [reason, setReason] = useState('')
  const [createReport] = useMutation(CreateReport)
  const [isOpen, setIsOpen, reportPost, setReportPost] = PostStore(s => [s.reportModal, s.setReportModal, s.reportPost, s.setReportPost])
  const clickReport = () => {
    createReport({
      variables: {
        createReportInput: {
          content: reportPost.content,
          postId: reportPost.id,
          reporter: reportPost.name,
          reason,
        },
      },
    })
    message.success('投诉成功')
    setIsOpen(false)
  }
  return (
    <Modal title="内容投诉" open={isOpen} onCancel={() => setIsOpen(false)}
      footer={
        <>
          <Button onClick={clickReport}>投诉</Button>
        </>
      }
    >
      <div>你要投诉的是<span className=' text-primary'>@{reportPost.name}发布的:</span>
        <div className='border border-border' dangerouslySetInnerHTML={{ __html: reportPost.content }}></div>
      </div>
      <p>请选择你想要投诉的类型</p>
      <Tabs
        tabPosition={'left'}
        items={ReportData.map((item) => {
          return {
            label: item.label,
            key: item.key,
            children: <div
              className='flex flex-wrap justify-start '
              onClick={(e) => {
                const div = e.target as HTMLDivElement
                setReason(div.textContent as string)
              }}>{item.children?.map((value, i) => <div key={i} className={`px-4 py-2 mb-1 mr-1 bg-[#f2f2f5] cursor-pointer ${reason === value ? 'text-primary' : ''}`}>{value}</div>)}</div>,
          }
        })}
      />
    </Modal>
  )
}

export default ReportModal
