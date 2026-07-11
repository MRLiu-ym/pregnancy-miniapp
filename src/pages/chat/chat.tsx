import { View, Text, Input, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './chat.scss';

// 后端 API 地址（部署 Cloudflare Workers 后替换为你的域名）
// 目前使用模拟回复，直到你部署后端
var API_URL = 'https://pregnancy-assistant-api.YOUR-NAME.workers.dev';
var USE_BACKEND = false; // 改为 true 并填入正确域名后启用

export default function Chat() {
  var _useState = useState([{
    role: 'assistant',
    content: '你好！我是孕期智能助手 💕\n\n我会根据你的健康档案和记录数据，给你个性化的分析和建议。\n\n你可以：\n📋 输入TSH值让我分析\n💊 咨询用药问题\n🥗 询问营养饮食\n🏥 了解产检规划\n⚠️ 描述不适症状\n📸 粘贴检查报告内容\n\n有什么我可以帮你的？',
  }]);
  var messages = _useState[0]; var setMessages = _useState[1];
  var _useState2 = useState('');
  var input = _useState2[0]; var setInput = _useState2[1];
  var _useState3 = useState(false);
  var loading = _useState3[0]; var setLoading = _useState3[1];

  var buildContext = function() {
    var profile = Taro.getStorageSync('profile') || {};
    var records = Taro.getStorageSync('healthRecords') || [];
    
    var weekInfo = '';
    if (profile.lastMenstrualPeriod) {
      var lmp = new Date(profile.lastMenstrualPeriod + 'T00:00:00');
      var today = new Date(); today.setHours(0,0,0,0);
      var days = Math.floor((today.getTime() - lmp.getTime()) / 86400000);
      var w = Math.floor(days / 7);
      var d = days % 7;
      var tri = w < 13 ? '孕早期' : w < 28 ? '孕中期' : '孕晚期';
      var due = new Date(lmp); due.setDate(due.getDate() + 280);
      var daysLeft = Math.floor((due.getTime() - today.getTime()) / 86400000);
      weekInfo = '当前孕' + w + '周+' + d + '天（' + tri + '），预产期' + due.toLocaleDateString('zh-CN') + '，距预产期' + daysLeft + '天';
    }

    var weightRecs = records.filter(function(r) { return r.type === 'weight'; }).sort(function(a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
    var tshRecs = records.filter(function(r) { return r.type === 'tsh'; }).sort(function(a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
    
    var dataInfo = '';
    if (weightRecs.length > 0) dataInfo += '\n最近体重：' + weightRecs[0].value + 'kg（' + weightRecs[0].date + '）';
    if (tshRecs.length > 0) dataInfo += '\n最近TSH：' + tshRecs[0].value + ' mIU/L（' + tshRecs[0].date + '）';

    return '【用户健康档案】\n年龄：' + (profile.age || '--') + '岁\n身高：' + (profile.heightCm || '--') + 'cm\n孕前体重：' + (profile.prePregnancyWeightKg || '--') + 'kg\n' + weekInfo + '\n甲减：' + (profile.hasThyroidCondition ? '是，服用' + (profile.thyroidMedication || '优甲乐') + ' ' + (profile.thyroidDosageMcg || '--') + 'μg/天' : '否') + '\n' + dataInfo + '\n\n请结合用户数据给出个性化建议。涉及医疗决策时提醒咨询医生。';
  };

  // 本地智能回复（无后端时使用，不消耗任何 API）
  var localReply = function(userMsg) {
    var msg = userMsg.toLowerCase();
    var profile = Taro.getStorageSync('profile') || {};
    var records = Taro.getStorageSync('healthRecords') || [];
    var tshRecs = records.filter(function(r) { return r.type === 'tsh'; }).sort(function(a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
    var latestTSH = tshRecs.length > 0 ? tshRecs[0].value : null;
    var weightRecs = records.filter(function(r) { return r.type === 'weight'; }).sort(function(a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
    var latestWeight = weightRecs.length > 0 ? weightRecs[0].value : null;

    if (msg.indexOf('tsh') !== -1 || msg.indexOf('甲功') !== -1) {
      if (latestTSH) {
        var target = profile.tshTargetEarly || 2.5;
        var status = latestTSH > target ? '⚠️ 偏高' : '✅ 正常';
        return '你的最近TSH：' + latestTSH + ' mIU/L（目标 < ' + target + '）\n\n状态：' + status + '\n\n' + (latestTSH > target ? '建议尽快复查并咨询医生调整优甲乐剂量。TSH偏高可能影响胎儿神经系统发育。' : '控制得很好！继续保持每2-4周监测一次TSH。');
      }
      return '你还没有记录TSH数据。请在「档案」页面添加TSH检查结果，我可以帮你分析。\n\n甲减孕妇建议每2-4周检测一次TSH。';
    }
    if (msg.indexOf('体重') !== -1 || msg.indexOf('weight') !== -1) {
      if (latestWeight && profile.prePregnancyWeightKg) {
        var gain = (latestWeight - profile.prePregnancyWeightKg).toFixed(1);
        return '孕前体重：' + profile.prePregnancyWeightKg + 'kg\n当前体重：' + latestWeight + 'kg\n已增重：' + gain + 'kg\n\n根据BMI，你整个孕期建议增重11.5-16kg。目前进度合理，继续保持每周0.4-0.5kg的增速。';
      }
      return '请先在档案中记录孕前体重和当前体重，我来帮你分析体重增长是否合理。';
    }
    if (msg.indexOf('用药') !== -1 || msg.indexOf('优甲乐') !== -1 || msg.indexOf('药') !== -1) {
      return '优甲乐使用要点：\n\n• 每天早晨空腹服用 ' + (profile.thyroidDosageMcg || '--') + 'μg\n• 服药后等30-60分钟再吃早餐\n• 与钙片、铁剂间隔4小时以上\n• 不要擅自停药或调量\n• 每2-4周复查TSH调整剂量\n• 产后需及时减量\n\n如有疑问请咨询内分泌科医生。';
    }
    if (msg.indexOf('营养') !== -1 || msg.indexOf('吃') !== -1 || msg.indexOf('饮食') !== -1) {
      return '孕期营养建议：\n\n🥬 叶酸：400-800μg/天（全孕期）\n🥛 钙：1000-1200mg/天（牛奶、豆制品）\n🥩 铁：27mg/天（红肉、动物肝脏）\n🐟 DHA：200mg/天（深海鱼）\n🧂 碘：保证加碘盐和海带摄入\n\n⚠️ 避免：生食、酒精、过量咖啡因\n⚠️ 甲减注意：服药后4小时内避免高钙食物';
    }
    if (msg.indexOf('产检') !== -1 || msg.indexOf('检查') !== -1) {
      return '重要产检时间表：\n\n📅 6-8周：首次B超，确认胎心\n📅 11-13周+6天：NT检查\n📅 15-20周：唐筛/无创DNA\n📅 20-24周：大排畸B超\n📅 24-28周：糖耐量OGTT\n📅 28周后：每2周产检，数胎动\n📅 36周后：每周产检\n\n甲减孕妇每次产检都要查TSH！';
    }
    if (msg.indexOf('症状') !== -1 || msg.indexOf('不适') !== -1 || msg.indexOf('疼') !== -1 || msg.indexOf('难受') !== -1) {
      return '请具体描述你的症状：\n• 什么感觉？（痛/胀/晕/恶心等）\n• 哪个部位？\n• 持续多久了？\n• 有没有伴随其他症状？\n\n⚠️ 以下情况请立即就医：\n• 阴道出血\n• 剧烈腹痛\n• 持续高烧\n• 严重头痛/视力模糊\n• 胎动明显减少（28周后）';
    }
    
    return '收到你的问题！💕\n\n目前我使用的是本地智能回复模式（不消耗API额度）。\n\n你可以试试这些话题：\n• TSH分析 — 分析你的甲功数据\n• 体重管理 — 评估体重增长\n• 用药咨询 — 优甲乐使用指导\n• 营养建议 — 孕期饮食要点\n• 产检规划 — 产检时间表\n• 症状咨询 — 不适症状分析\n\n要获得更智能的AI回复，需要部署后端服务。';
  };

  var send = async function() {
    if (!input.trim() || loading) return;
    var userContent = input.trim();
    var userMsg = { role: 'user', content: userContent };
    
    setMessages(function(prev) { return prev.concat([userMsg]); });
    setInput('');
    setLoading(true);

    // 模拟延迟，让用户感知"思考中"
    setTimeout(function() {
      var reply = localReply(userContent);
      setMessages(function(prev) { return prev.concat([{ role: 'assistant', content: reply }]); });
      setLoading(false);
    }, 600);
  };

  return (
    <View className="chat-page">
      <ScrollView className="msg-list" scrollY scrollIntoView="bottom" scrollWithAnimation>
        {messages.map(function(m, i) {
          return (
            <View key={i} className={'msg ' + m.role}>
              <View className={'bubble ' + m.role}>
                <Text className="bubble-text" userSelect>{m.content}</Text>
              </View>
            </View>
          );
        })}
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
          onInput={function(e) { setInput(e.detail.value); }} onConfirm={send} />
        <View className="send-btn" onClick={send}><Text>发送</Text></View>
      </View>
      <View className="quick-btns">
        {['TSH分析', '体重管理', '营养建议', '用药咨询', '产检规划', '症状咨询'].map(function(t) {
          return (
            <View key={t} className="quick" onClick={function() { setInput(t); }}>
              <Text>{t}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
