import { measureTextWidth, Pie } from '@ant-design/charts';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Statistic } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import React, { useRef, useState } from 'react';
import request from 'umi-request';

const App: React.FC = () => {
  const { Divider } = ProCard;
  const [responsive, setResponsive] = useState(false);
  const onTableChange = () => { };
  const actionRef = useRef<ActionType>();
  const arr: ProColumns[] = [
    { title: 'SKU', dataIndex: 'SKU', key: 'SKU', width: 120 },
    { title: 'SKU序号', dataIndex: 'SKU序号', key: 'SKU序号', width: 90 },
    { title: '款式序号', dataIndex: '款式序号', key: '款式序号', search: false, width: 90 },
    { title: 'SKU名称', dataIndex: 'SKU名称', key: 'SKU名称', search: false },
    { title: '海外仓', dataIndex: '海外仓', key: '海外仓', search: false, width: 90 },
    { title: 'FBA', dataIndex: 'FBA', key: 'FBA', search: false, width: 90 },
    { title: 'WF', dataIndex: 'WF', key: 'WF', search: false, width: 90 },
    { title: 'WM', dataIndex: 'WM', key: 'WM', search: false, width: 90 },

    { title: '在途', dataIndex: '在途', key: '在途', search: false, width: 90 },
    { title: '实际开船日期', dataIndex: '实际开船日期', key: '实际开船日期', search: false },
    { title: '在途已到港', dataIndex: '在途已到港', key: '在途已到港', search: false, width: 90 },
    { title: '实际到港时间', dataIndex: '实际到港时间', key: '实际到港时间', search: false },
    { title: '仓库', dataIndex: '仓库', key: '仓库', search: false },
    { title: '所在区域', dataIndex: '所在区域', key: '所在区域', search: false, width: 90 },
  ];

  const [haiwai, sethaiwai] = useState<any>({});
  const [FBA, setFBA] = useState<any>({});
  const [WF, setWF] = useState<any>({});
  const [WM, setWM] = useState<any>({});
  const [zaitu, setzaitu] = useState<any>({});
  const [daogang, setdaogang] = useState<any>({});
  const [haiwaipie, sethaiwaipie] = useState<any>([{}]);
  const [zaitupie, setzaitupie] = useState<any>([{}]);
  const [daogangpie, setdaogangpie] = useState<any>([{}]);

  function renderStatistic(containerWidth: number, text: string, style: { fontSize: number }) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
        ),
        1,
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'
      };">${text}</div>`;
  }

  // @ts-ignore
  const config1 = {
    height: 180,
    appendPadding: 10,
    data: haiwaipie,
    angleField: 'value',
    colorField: 'type',
    color: ({ type }) => {
      if (type === '美东') {
        return '#ff8c00';
      }
      if (type === '美西南') {
        return '#0E8E89';
      }
      if (type === '美中') {
        return '#9FB40F';
      }
      if (type === '美西') {
        return '#1e90ff';
      }
      if (type === '美南') {
        return '#ffd700';
      }
      if (type === '欧洲') {
        return '#a9a9a9';
      }
      if (type === 'WM') {
        return '#7b68ee';
      }
      if (type === '沃尔玛') {
        return '#7b68ee';
      }
      if (type === 'WF') {
        return '#dc143c';
      }
      if (type === 'FBA') {
        return '#8fbc8b';
      }

      return 'yellow';
    },
    radius: 0.7,
    innerRadius: 0.64,
    meta: {
      value: {},
    },
    label: {
      type: 'spider',
      offset: '70%',
      style: {
        textAlign: 'center',
      },
      autoRotate: true,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        style: {
          fontSize: '14px',
        },
        customHtml: (
          container: { getBoundingClientRect: () => { width: any; height: any } },
          view: any,
          datum: { type: any },
        ) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 14,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '14px',
        },
        customHtml: (
          container: { getBoundingClientRect: () => { width: any } },
          view: any,
          datum: { value: any },
          data: any[],
        ) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 10,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  const config2 = {
    height: 180,
    appendPadding: 10,
    data: zaitupie,
    angleField: 'value',
    colorField: 'type',
    color: ({ type }) => {
      if (type === '美东') {
        return '#ff8c00';
      }
      if (type === '美西南') {
        return '#0E8E89';
      }
      if (type === '美中') {
        return '#9FB40F';
      }
      if (type === '美西') {
        return '#1e90ff';
      }
      if (type === '美南') {
        return '#ffd700';
      }
      if (type === '欧洲') {
        return '#a9a9a9';
      }
      if (type === 'WM') {
        return '#7b68ee';
      }
      if (type === '沃尔玛') {
        return '#7b68ee';
      }
      if (type === 'WF') {
        return '#dc143c';
      }
      if (type === 'FBA') {
        return '#8fbc8b';
      }

      return 'yellow';
    },
    radius: 0.7,
    innerRadius: 0.64,
    meta: {
      value: {},
    },
    label: {
      type: 'spider',
      offset: '70%',
      style: {
        textAlign: 'center',
      },
      autoRotate: true,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        style: {
          fontSize: '14px',
        },
        customHtml: (
          container: { getBoundingClientRect: () => { width: any; height: any } },
          view: any,
          datum: { type: any },
        ) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 14,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '14px',
        },
        customHtml: (
          container: { getBoundingClientRect: () => { width: any } },
          view: any,
          datum: { value: any },
          data: any[],
        ) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 10,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  const config3 = {
    height: 180,
    appendPadding: 10,
    data: daogangpie,
    angleField: 'value',
    colorField: 'type',
    color: ({ type }) => {
      if (type === '美东') {
        return '#ff8c00';
      }
      if (type === '美西南') {
        return '#0E8E89';
      }
      if (type === '美中') {
        return '#9FB40F';
      }
      if (type === '美西') {
        return '#1e90ff';
      }
      if (type === '美南') {
        return '#ffd700';
      }
      if (type === '欧洲') {
        return '#a9a9a9';
      }
      if (type === 'WM') {
        return '#7b68ee';
      }
      if (type === '沃尔玛') {
        return '#7b68ee';
      }
      if (type === 'WF') {
        return '#dc143c';
      }
      if (type === 'FBA') {
        return '#8fbc8b';
      }

      return 'yellow';
    },
    radius: 0.7,
    innerRadius: 0.64,
    meta: {
      value: {},
    },
    label: {
      type: 'spider',
      offset: '70%',
      style: {
        textAlign: 'center',
      },
      autoRotate: true,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        style: {
          fontSize: '14px',
        },
        customHtml: (
          container: { getBoundingClientRect: () => { width: any; height: any } },
          view: any,
          datum: { type: any },
        ) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 14,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '14px',
        },
        customHtml: (
          container: { getBoundingClientRect: () => { width: any } },
          view: any,
          datum: { value: any },
          data: any[],
        ) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 10,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };

  return (
    <PageContainer>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 560);
        }}
      >
        <ProCard.Group title="SKU库存总数据" direction={responsive ? 'column' : 'row'}>
          <ProCard colSpan="30%">
            <Statistic title="海外仓" value={haiwai} />
            <Pie {...config1} />
          </ProCard>

          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard colSpan="7%">
            <ProCard style={{ marginTop: -5 }} gutter={[16, 16]}>
              <Statistic title="FBA" value={FBA} />
              <Statistic title="WF" value={WF} />
              <Statistic title="WM" value={WM} />
            </ProCard>
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard colSpan="30%">
            <Statistic title="在途" value={zaitu} />
            <Pie {...config2} />
          </ProCard>
          <ProCard colSpan="30%">
            <Statistic title="在途已到港" value={daogang} />
            <Pie {...config3} />
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
        </ProCard.Group>
      </RcResizeObserver>

      <ProTable
        columns={arr}
        request={async (skusearch = {}) => {
          console.log(skusearch);
          const result = request('/api/inventory', {
            method: 'POST',
            data: { ...skusearch },
            requestType: 'form',
            success: true,
          });
          const data = await result;
          sethaiwai(data.haiwai);
          setzaitu(data.zaitu);
          setdaogang(data.daogang);
          setFBA(data.FBA);
          setWF(data.WF);
          setWM(data.WM);
          sethaiwaipie(data.haiwaipie);
          setzaitupie(data.zaitupie);
          setdaogangpie(data.daogangpie);
          return result;
        }}
        search={{
          labelWidth: 'auto',
          span: 5,
          defaultCollapsed: false,
        }}
        actionRef={actionRef}
        onChange={onTableChange}
        pagination={{
          pageSize: 100,
        }}
        scroll={{ x: 1000, y: 400 }}
        headerTitle="SKU库存分布表"
      />
    </PageContainer>
  );
};

export default App;
