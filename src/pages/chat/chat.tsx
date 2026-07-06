import { View, Text, Input, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState, useRef, useEffect } from 'react';
import Taro from '@tarojs/taro';
import './chat.scss';

export default function Chat() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: '你好！我是孕期智能助手 💕\n\n你可以问我：\n📋 TSH分析\n💊 用药咨询\n🥗 营养建议\n🏥 产检规划\n⚠️ 症状评估\n\n请告诉我你需要什么帮助？',
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const send = () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const reply = processLocal(input.trim());
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <View className="chat-page">
      <ScrollView className="msg-list" scrollY scrollIntoView="bottom">
        {messages.map((m, i) => (
          <View key={i} className={`msg ${m.role}`}>
            <View className={`bubble ${m.role}`}>
              <Text className="bubble-text">{m.content}</Text>
            </View>
          </View>
        ))}
        {loading && (
          <View className="msg assistant">
            <View className="bubble assistant">
              <Text>思考中...</Text>
            </View>
          </View>
        )}
        <View id="bottom" />
      </ScrollView>
      <View className="input-bar">
        <Input className="chat-input" value={input} placeholder="输入问题..." confirmType="send"
          onInput={e => setInput(e.detail.value)} onConfirm={send} />
        <View className="send-btn" onClick={send}><Text>发送</Text></View>
      </View>
      <View className="quick-btns">
        {['TSH分析', '体重管理', '营养建议', '用药咨询', '产检规划'].map(t => (
          <View key={t} className="quick" onClick={() => { setInput(t); }}>
            <Text>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function processLocal(q) {
  const profile = Taro.getStorageSync('profile') || {};
  const records = Taro.getStorageSync('healthRecords') || [];
  const lc = q.toLowerCase();

  if (lc.includes('tsh') || lc.includes('甲功')) {
    const tshRecs = records.filter((r) => r.type === 'tsh').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latest = tshRecs[0];
    return `**TSH 分析**\n\n${latest ? `最近一次：${latest.value} mIU/L（${latest.date}）` : '暂无TSH记录'}\n目标值：< ${profile.tshTargetEarly || 2.5} mIU/L\n\n${latest && latest.value > (profile.tshTargetEarly || 2.5) ? '⚠️ TSH偏高！建议尽快联系内分泌科医生调整优甲乐剂量。' : '请继续保持定期监测。'}\n\n📌 每天空腹服用优甲乐，等30分钟再吃早餐。`;
  }
  if (lc.includes('体重')) {
    const wRecs = records.filter((r) => r.type === 'weight').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latest = wRecs[0];
    return `**体重管理**\n\n${latest ? `最近：${latest.value}kg（${latest.date}）` : '暂无记录'}\n孕前：${profile.prePregnancyWeightKg || '--'}kg\nBMI：${profile.prePregnancyWeightKg && profile.heightCm ? (profile.prePregnancyWeightKg / ((profile.heightCm/100)**2)).toFixed(1) : '--'}\n\n建议每周测量一次，保持合理增长。`;
  }
  if (lc.includes('营养') || lc.includes('吃')) {
    return `**孕期营养建议**\n\n🍽️ 每日必须：\n🍃 叶酸 400-800μg\n🥚 蛋白质 70-90g\n🥛 钙 1000-1200mg\n🩸 铁 27-30mg\n🐟 DHA 200mg\n\n🚫 避免：生食、酒精、过量咖啡因`;
  }
  if (lc.includes('药') || lc.includes('优甲乐')) {
    return `**优甲乐用药指导**\n\n💊 ${profile.thyroidMedication || '优甲乐'} ${profile.thyroidDosageMcg || '--'}μg/天\n⏰ 每天早晨空腹服用\n⚠️ 服药后等30分钟再吃早餐\n⚠️ 钙片/铁剂间隔4小时以上`;
  }
  if (lc.includes('产检') || lc.includes('检查')) {
    return `**产检规划**\n\n📋 关键节点：\n• 6-8周：首次B超\n• 11-13周：NT检查\n• 15-20周：唐筛/无创DNA\n• 20-24周：大排畸\n• 24-28周：糖耐量\n• 28周起：每2周一次\n• 36周起：每周一次`;
  }
  return `感谢你的提问！我可以帮你分析：\n\n📋 TSH值解读\n💊 用药咨询\n🥗 营养饮食建议\n🏥 产检规划\n⚠️ 症状评估\n\n请告诉我你具体想了解什么？`;
}
