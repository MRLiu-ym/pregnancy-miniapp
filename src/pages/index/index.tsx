import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

export default function Index() {
  const [profile, setProfile] = useState(null);
  const [pregnancy, setPregnancy] = useState(null);

  useLoad(() => {
    const data = Taro.getStorageSync('profile');
    if (data) {
      setProfile(data);
      const p = calcPregnancy(data.lastMenstrualPeriod);
      setPregnancy(p);
    }
  });

  if (!profile) {
    return (
      <View className="welcome">
        <Text className="welcome-emoji">🤰</Text>
        <Text className="welcome-title">欢迎使用孕期智能助手</Text>
        <Text className="welcome-desc">我是你的专属孕期健康管家{'\n'}帮你记录、提醒、分析</Text>
        <View className="btn" onClick={() => Taro.switchTab({ url: '/pages/profile/profile' })}>
          <Text>开始建立孕期档案 →</Text>
        </View>
      </View>
    );
  }

  const progress = Math.min(100, Math.round((pregnancy.currentWeek / 40) * 100));
  const risks = assessRisks(profile, pregnancy);

  return (
    <View className="page">
      {/* 孕周卡片 */}
      <View className="card-gradient">
        <View className="progress-wrap">
          <View className="progress-circle">
            <Text className="progress-num">{pregnancy.currentWeek}</Text>
            <Text className="progress-total">/ 40周</Text>
          </View>
          <View className="progress-info">
            <Text className="stage">{pregnancy.stageName}</Text>
            <Text className="week">孕{pregnancy.currentWeek}周+{pregnancy.currentDay}天</Text>
            <Text className="due">预产期 {pregnancy.dueDate}</Text>
            <View className="countdown">
              <Text>距预产期 {pregnancy.daysUntilDue} 天</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 风险提醒 */}
      {risks.length > 0 && risks.slice(0, 2).map((r, i) => (
        <View key={i} className={`risk-card risk-${r.level}`}>
          <Text className="risk-icon">{r.level === 'urgent' ? '🔴' : '🟡'}</Text>
          <View className="risk-body">
            <Text className="risk-title">{r.title}</Text>
            <Text className="risk-desc">{r.description}</Text>
            <Text className="risk-sugg">{r.suggestion}</Text>
          </View>
        </View>
      ))}

      {/* 宝宝发育 */}
      <View className="card">
        <View className="card-header">
          <Text className="baby-emoji">👶</Text>
          <View>
            <Text className="card-title">宝宝发育</Text>
            <Text className="card-sub">{pregnancy.fetalSize} · {pregnancy.fetalWeight}</Text>
          </View>
        </View>
        <Text className="fetal-desc">{pregnancy.fetalDescription}</Text>
        <View className="milestones">
          {pregnancy.fetalMilestones.map((m, i) => (
            <Text key={i} className="tag">{m}</Text>
          ))}
        </View>
      </View>

      {/* 快捷操作 */}
      <View className="grid-3">
        <View className="quick-btn" onClick={() => Taro.switchTab({ url: '/pages/profile/profile' })}>
          <Text className="quick-icon">⚖️</Text><Text className="quick-label">记录体重</Text>
        </View>
        <View className="quick-btn" onClick={() => Taro.switchTab({ url: '/pages/profile/profile' })}>
          <Text className="quick-icon">💊</Text><Text className="quick-label">记录用药</Text>
        </View>
        <View className="quick-btn" onClick={() => Taro.switchTab({ url: '/pages/profile/profile' })}>
          <Text className="quick-icon">🧪</Text><Text className="quick-label">记录TSH</Text>
        </View>
        <View className="quick-btn" onClick={() => Taro.switchTab({ url: '/pages/chat/chat' })}>
          <Text className="quick-icon">💬</Text><Text className="quick-label">AI咨询</Text>
        </View>
        <View className="quick-btn" onClick={() => Taro.switchTab({ url: '/pages/charts/charts' })}>
          <Text className="quick-icon">📊</Text><Text className="quick-label">数据图表</Text>
        </View>
        <View className="quick-btn" onClick={() => Taro.switchTab({ url: '/pages/reminders/reminders' })}>
          <Text className="quick-icon">🔔</Text><Text className="quick-label">提醒列表</Text>
        </View>
      </View>

      {/* 今日提醒 */}
      <View className="card">
        <View className="card-header-row">
          <Text className="card-title">今日提醒</Text>
          <Text className="link" onClick={() => Taro.switchTab({ url: '/pages/reminders/reminders' })}>查看全部</Text>
        </View>
        <View className="reminder-item"><Text>💊 优甲乐 {profile.thyroidDosageMcg}μg 空腹服用</Text></View>
        <View className="reminder-item"><Text>🍃 叶酸 400μg 补充</Text></View>
        {pregnancy.currentWeek <= 12 && (
          <View className="reminder-item"><Text>⚠️ 避免剧烈运动和重物提举</Text></View>
        )}
      </View>
    </View>
  );
}

// 孕周计算（内联，避免模块导入问题）
function calcPregnancy(lmp) {
  const lmpDate = new Date(lmp + 'T00:00:00');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const daysSince = Math.floor((today.getTime() - lmpDate.getTime()) / 86400000);
  const week = Math.floor(daysSince / 7);
  const day = daysSince % 7;
  const dueDate = new Date(lmpDate); dueDate.setDate(dueDate.getDate() + 280);
  const daysUntil = Math.floor((dueDate.getTime() - today.getTime()) / 86400000);
  const trimester = week < 13 ? 1 : week < 28 ? 2 : 3;
  const stageNames = { 1: '孕早期', 2: '孕中期', 3: '孕晚期' };
  
  const fetalData = [
    { w: [0,4], s: '约0.1mm', wt: '<1mg', d: '受精卵着床，细胞快速分裂中', m: ['受精完成', '细胞分裂', '着床于子宫'] },
    { w: [5,8], s: '约1.5-2cm', wt: '约1-3g', d: '心脏开始跳动，器官正在形成', m: ['心脏开始跳动 ❤️', '神经管闭合', '四肢芽出现'] },
    { w: [9,12], s: '约5-6cm', wt: '约14-20g', d: '手指脚趾形成，开始会动了', m: ['手指脚趾分离', '开始运动', '性别分化'] },
    { w: [13,16], s: '约12-14cm', wt: '约100-140g', d: '可以分辨性别，长出细软胎毛', m: ['性别可分辨', '长出胎毛', '开始吞咽羊水'] },
    { w: [17,20], s: '约25-28cm', wt: '约300-400g', d: '开始有胎动感觉，宝宝会踢腿了', m: ['感受到胎动 🦋', '胎脂形成', '眉毛睫毛长出'] },
    { w: [21,24], s: '约30-33cm', wt: '约600-750g', d: '有睡眠和醒来的周期', m: ['有睡眠周期 😴', '能听到声音', '肺开始发育'] },
    { w: [25,28], s: '约37-40cm', wt: '约1000-1300g', d: '眼睛可以睁开，大脑快速发育', m: ['眼睛睁开 👀', '大脑快速发育 🧠', '有规律作息'] },
    { w: [29,32], s: '约42-44cm', wt: '约1600-2000g', d: '骨骼变硬，肺部继续成熟', m: ['骨骼钙化', '头部转向下方', '皮下脂肪增加'] },
    { w: [33,36], s: '约47-50cm', wt: '约2500-2900g', d: '肺部基本成熟，准备出生', m: ['肺部基本成熟 🫁', '入盆准备', '免疫系统完善'] },
    { w: [37,40], s: '约50-52cm', wt: '约3000-3600g', d: '宝宝已足月，随时准备见面！', m: ['已足月 🎉', '随时可能发动', '准备就绪'] },
  ];
  const fetal = fetalData.find(f => week >= f.w[0] && week <= f.w[1]) || fetalData[9];

  return {
    currentWeek: week, currentDay: day, daysUntilDue: daysUntil,
    trimester, stageName: stageNames[trimester],
    dueDate: dueDate.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' }),
    fetalSize: fetal.s, fetalWeight: fetal.wt,
    fetalDescription: fetal.d, fetalMilestones: fetal.m,
  };
}

function assessRisks(profile, pregnancy) {
  const risks = [];
  if (profile.hasThyroidCondition) {
    const records = Taro.getStorageSync('healthRecords') || [];
    const tshRecords = records.filter((r) => r.type === 'tsh').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const target = pregnancy.trimester === 1 ? profile.tshTargetEarly : profile.tshTargetMid;
    if (tshRecords.length > 0 && tshRecords[0].value > target) {
      risks.push({ level: 'urgent', title: 'TSH 偏高！', description: `当前 TSH: ${tshRecords[0].value} mIU/L，目标 < ${target}`, suggestion: '请尽快复查并联系医生调整优甲乐剂量' });
    } else if (tshRecords.length === 0) {
      risks.push({ level: 'high', title: 'TSH 未记录', description: '尚未记录TSH检查结果', suggestion: '甲减孕妇需每2-4周监测TSH' });
    }
  }
  if (pregnancy.currentWeek >= 11 && pregnancy.currentWeek <= 13) {
    risks.push({ level: 'high', title: 'NT检查提醒', description: `当前${pregnancy.currentWeek}周+${pregnancy.currentDay}天`, suggestion: '请尽快预约NT检查（11-13周+6天）' });
  }
  return risks;
}
