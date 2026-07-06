import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState, useMemo } from 'react';
import Taro from '@tarojs/taro';
import './reminders.scss';

export default function Reminders() {
  const [profile, setProfile] = useState(null);
  const [pregnancy, setPregnancy] = useState(null);

  useLoad(() => {
    const p = Taro.getStorageSync('profile');
    if (p) {
      setProfile(p);
      setPregnancy(calcPW(p.lastMenstrualPeriod));
    }
  });

  const reminders = useMemo(() => {
    if (!profile || !pregnancy) return [];
    const w = pregnancy.currentWeek;
    const items = [
      { t: '💊 用药', p: 'urgent', title: '优甲乐每日用药', desc: `每天早晨空腹服用优甲乐 ${profile.thyroidDosageMcg}μg，服药后等30分钟再吃早餐`, time: '每天早晨' },
      { t: '🍃 营养', p: 'high', title: '叶酸补充', desc: '每日补充叶酸400-800μg', time: '每天' },
      { t: '🧪 产检', p: 'high', title: 'TSH定期复查', desc: `TSH目标 < ${pregnancy.trimester === 1 ? profile.tshTargetEarly : profile.tshTargetMid} mIU/L，每2-4周复查`, time: '每2-4周' },
      { t: '🥗 营养', p: 'normal', title: '孕期营养均衡', desc: w <= 12 ? '孕早期：注重叶酸、碘、铁。蛋白质70-80g/天' : '孕中/晚期：增加蛋白质和钙摄入', time: '持续' },
      { t: '📝 总结', p: 'normal', title: '每周健康总结', desc: '回顾本周用药、体重、症状变化', time: '每周日' },
      { t: '⚠️ 注意', p: 'high', title: '避免危险行为', desc: '禁酒、禁烟、避免生食、限制咖啡因', time: '整个孕期' },
    ];
    if (w >= 11 && w <= 13) items.push({ t: '🏥 产检', p: 'urgent', title: 'NT检查预约', desc: '孕11-13周+6天，请尽快预约！', time: '当前' });
    if (w >= 5 && w <= 8) items.push({ t: '🏥 产检', p: 'high', title: '首次B超', desc: '孕6-8周，确认宫内妊娠和胎心', time: '即将' });
    return items;
  }, [profile, pregnancy]);

  if (!profile) return <View className="empty"><Text>请先完善档案</Text></View>;

  return (
    <View className="page">
      <ScrollView scrollY className="scroll">
        {reminders.map((r, i) => (
          <View key={i} className={`reminder-card ${r.p}`}>
            <View className="reminder-top">
              <Text className="reminder-type">{r.t}</Text>
              <Text className={`reminder-pri ${r.p}`}>{r.p === 'urgent' ? '🔴 紧急' : r.p === 'high' ? '🟡 重要' : '🔵 常规'}</Text>
            </View>
            <Text className="reminder-title">{r.title}</Text>
            <Text className="reminder-desc">{r.desc}</Text>
            <Text className="reminder-time">{r.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function calcPW(lmp) {
  const lmpD = new Date(lmp + 'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  const days = Math.floor((today.getTime() - lmpD.getTime()) / 86400000);
  return { currentWeek: Math.floor(days/7), currentDay: days%7, trimester: Math.floor(days/7) < 13 ? 1 : Math.floor(days/7) < 28 ? 2 : 3 };
}
