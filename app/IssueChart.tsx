'use client';

import React from 'react';
import { Card } from '@radix-ui/themes';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart: React.FC<Props> = ({ open, closed, inProgress }) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'Closed', value: closed },
    { label: 'In progress', value: inProgress },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={50} style={{ fill: 'var(--accent-9)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
