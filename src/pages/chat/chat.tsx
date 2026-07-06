import { View, Text, Input, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './chat.scss';

const API_KEY = 'KEY_REMOVED_FOR_SECURITY';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export default function Chat() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: '你好！我是孕期智能助手 💕\n\n我会根据你的健康档案和记录数据，给你个性化的分析和建议。\n\n你可以：\n📋 输入TSH值让我分析\n💊 咨询用药问题\n🥗 询问营养饮食\n🏥 了解产检规划\n⚠️ 描述不适症状\n📸 粘贴检查报告内容\n\n有什么我可以帮你的？',
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const buildContext = () => {
    const profile = Taro.getStorageSync('profile') || {};
    const records = Taro.getStorageSync('healthRecords') || [];
    
    // 计算孕周
    let weekInfo = '';
    if (profile.lastMenstrualPeriod) {
      const lmp = new Date(profile.lastMenstrualPeriod + 'T00:00:00');
      const today = new Date(); today.setHours(0,0,0,0);
      const days = Math.floor((today.getTime() - lmp.getTime()) / 86400000);
      const w = Math.floor(days / 7);
      const d = days % 7;
      const tri = w < 13 ? '孕早期' : w < 28 ? '孕中期' : '孕晚期';
      const due = new Date(lmp); due.setDate(due.getDate() + 280);
      const daysLeft = Math.floor((due.getTime() - today.getTime()) / 86400000);
      weekInfo = `当前孕${w}周+${d}天（${tri}），预产期${due.toLocaleDateString('zh-CN')}，距预产期${daysLeft}天`;
    }

    // 健康数据
    const weightRecs = records.filter(r => r.type === 'weight').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const tshRecs = records.filter(r => r.type === 'tsh').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let dataInfo = '';
    if (weightRecs.length > 0) dataInfo += `\n最近体重：${weightRecs[0].value}kg（${weightRecs[0].date}）`;
    if (tshRecs.length > 0) dataInfo += `\n最近TSH：${tshRecs[0].value} mIU/L（${tshRecs[0].date}）`;

    return `【用户健康档案 - 请基于此数据给出个性化建议】
年龄：${profile.age || '--'}岁
身高：${profile.heightCm || '--'}cm
孕前体重：${profile.prePregnancyWeightKg || '--'}kg
${weekInfo}
甲减：${profile.hasThyroidCondition ? `是，服用${profile.thyroidMedication || '优甲乐'} ${profile.thyroidDosageMcg || '--'}μg/天，TSH目标：早<${profile.tshTargetEarly || 2.5} 中<${profile.tshTargetMid || 3.0} 晚<${profile.tshTargetLate || 3.0} mIU/L` : '否'}
${dataInfo}

请用温暖、专业、易懂的中文回答，结合用户的具体数据给出个性化建议。如有风险请清晰标注。涉及医疗决策时提醒咨询医生。`;
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userContent = input.trim();
    const userMsg = { role: 'user', content: userContent };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const context = buildContext();
      
      // 构建对话历史（最近10条）
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.content,
      }));

      const resp = await Taro.request({
        url: API_URL,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        data: {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: context },
            ...history,
            { role: 'user', content: userContent },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        },
        timeout: 30000,
      });

      if (resp.statusCode === 200 && resp.data?.choices?.length > 0) {
        const reply = resp.data.choices[0].message.content;
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      } else {
        throw new Error('API返回异常');
      }
    } catch (e) {
      console.error('AI请求失败:', e);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '抱歉，AI 服务暂时不可用 😔\n\n可能原因：\n• 网络连接异常\n• API 额度用完了\n\n请稍后重试，或检查网络后重新发送。' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="chat-page">
      <ScrollView className="msg-list" scrollY scrollIntoView="bottom" scrollWithAnimation>
        {messages.map((m, i) => (
          <View key={i} className={`msg ${m.role}`}>
            <View className={`bubble ${m.role}`}>
              <Text className="bubble-text" userSelect>{m.content}</Text>
            </View>
          </View>
        ))}
        {loading && (
          <View className="msg assistant">
            <View className="bubble assistant loading-bubble">
              <Text>正在分析中</Text>
              <View className="dots">
                <View className="dot" /><View className="dot" /><View className="dot" />
              </View>
            </View>
          </View>
        )}
        <View id="bottom" />
      </ScrollView>
      <View className="input-bar">
        <Input className="chat-input" value={input} placeholder="输入你的问题或粘贴检查数据..." confirmType="send"
          onInput={e => setInput(e.detail.value)} onConfirm={send} />
        <View className="send-btn" onClick={send}><Text>发送</Text></View>
      </View>
      <View className="quick-btns">
        {['TSH分析', '体重管理', '营养建议', '用药咨询', '产检规划', '症状咨询'].map(t => (
          <View key={t} className="quick" onClick={() => { setInput(t); }}>
            <Text>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
