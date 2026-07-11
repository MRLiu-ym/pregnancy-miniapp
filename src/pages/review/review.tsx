import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './review.scss';

export default function Review() {
  var _useState = useState(null);
  var profile = _useState[0]; var setProfile = _useState[1];
  var _useState2 = useState([]);
  var records = _useState2[0]; var setRecords = _useState2[1];
  var _useState3 = useState(null);
  var analysis = _useState3[0]; var setAnalysis = _useState3[1];

  useLoad(function() {
    var p = Taro.getStorageSync('profile');
    var r = Taro.getStorageSync('healthRecords') || [];
    setProfile(p);
    setRecords(r);
    if (p && r.length > 0) {
      setAnalysis(analyzeData(p, r));
    }
  });

  if (!profile) {
    return (
      <View className="empty-page">
        <Text className="empty-icon">📊</Text>
        <Text className="empty-title">请先完善档案</Text>
        <Text className="empty-desc">在「档案」页面填写基本信息和健康数据后{'\n'}即可查看健康报告</Text>
      </View>
    );
  }

  if (!analysis) {
    return (
      <View className="empty-page">
        <Text className="empty-icon">📝</Text>
        <Text className="empty-title">暂无健康数据</Text>
        <Text className="empty-desc">在「档案」页面记录体重、TSH等数据后{'\n'}我会帮你生成健康报告</Text>
      </View>
    );
  }

  return (
    <View className="page">
      <ScrollView className="scroll" scrollY>
        {/* 总体评估 */}
        <View className={'summary-card ' + analysis.overallLevel}>
          <Text className="summary-title">📋 总体评估</Text>
          <Text className="summary-text">{analysis.overall}</Text>
        </View>

        {/* TSH 分析 */}
        {analysis.tsh && (
          <View className="card">
            <View className="card-title-row">
              <Text className="card-title">🧪 TSH 分析</Text>
              <Text className={'status-badge ' + (analysis.tsh.status === 'normal' ? 'good' : 'warn')}>
                {analysis.tsh.status === 'normal' ? '达标 ✅' : '偏高 ⚠️'}
              </Text>
            </View>
            <View className="data-row">
              <Text className="data-label">最近TSH</Text>
              <Text className={'data-value ' + (analysis.tsh.status === 'normal' ? 'green' : 'red')}>
                {analysis.tsh.latest} mIU/L
              </Text>
            </View>
            <View className="data-row">
              <Text className="data-label">目标值</Text>
              <Text className="data-value">{'< ' + analysis.tsh.target}</Text>
            </View>
            <View className="data-row">
              <Text className="data-label">检测日期</Text>
              <Text className="data-value gray">{analysis.tsh.date}</Text>
            </View>
            <View className="data-row">
              <Text className="data-label">优甲乐剂量</Text>
              <Text className="data-value">{profile.thyroidDosageMcg}μg/天</Text>
            </View>
            <View className="analysis-box">
              <Text className="analysis-text">{analysis.tsh.suggestion}</Text>
            </View>
          </View>
        )}

        {/* 体重分析 */}
        {analysis.weight && (
          <View className="card">
            <View className="card-title-row">
              <Text className="card-title">⚖️ 体重分析</Text>
              <Text className={'status-badge ' + (analysis.weight.status === 'normal' ? 'good' : 'warn')}>
                {analysis.weight.status === 'normal' ? '正常 ✅' : '注意 ⚠️'}
              </Text>
            </View>
            <View className="data-row">
              <Text className="data-label">孕前体重</Text>
              <Text className="data-value">{analysis.weight.preWeight}kg</Text>
            </View>
            <View className="data-row">
              <Text className="data-label">当前体重</Text>
              <Text className="data-value bold">{analysis.weight.current}kg</Text>
            </View>
            <View className="data-row">
              <Text className="data-label">已增重</Text>
              <Text className={'data-value ' + (analysis.weight.status === 'normal' ? 'green' : 'red')}>
                {analysis.weight.gain}kg
              </Text>
            </View>
            <View className="data-row">
              <Text className="data-label">建议总增重</Text>
              <Text className="data-value gray">{analysis.weight.target}</Text>
            </View>
            <View className="analysis-box">
              <Text className="analysis-text">{analysis.weight.suggestion}</Text>
            </View>
          </View>
        )}

        {/* 记录统计 */}
        <View className="card">
          <Text className="card-title">📈 记录统计</Text>
          <View className="stats-row">
            <View className="stat-item">
              <Text className="stat-num">{analysis.totalRecords}</Text>
              <Text className="stat-label">总记录数</Text>
            </View>
            <View className="stat-item">
              <Text className="stat-num">{analysis.weightCount}</Text>
              <Text className="stat-label">体重记录</Text>
            </View>
            <View className="stat-item">
              <Text className="stat-num">{analysis.tshCount}</Text>
              <Text className="stat-label">TSH记录</Text>
            </View>
          </View>
          {analysis.totalRecords < 5 && (
            <View className="analysis-box hint">
              <Text className="analysis-text">💡 数据越多，分析越准确。建议每周至少记录1次体重，每2-4周记录1次TSH。</Text>
            </View>
          )}
        </View>

        {/* 建议汇总 */}
        <View className="card">
          <Text className="card-title">💡 本周建议</Text>
          <View className="tips-list">
            {analysis.tips.map(function(tip, i) {
              return (
                <View key={i} className="tip-item">
                  <Text className="tip-icon">{tip.icon}</Text>
                  <Text className="tip-text">{tip.text}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{height:40}} />
      </ScrollView>
    </View>
  );
}

function analyzeData(profile, records) {
  var tshRecs = records.filter(function(r) { return r.type === 'tsh'; }).sort(function(a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
  var weightRecs = records.filter(function(r) { return r.type === 'weight'; }).sort(function(a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });

  var result = {
    totalRecords: records.length,
    tshCount: tshRecs.length,
    weightCount: weightRecs.length,
    overall: '',
    overallLevel: 'good',
    tips: [],
    tsh: null,
    weight: null,
  };

  // TSH 分析
  if (tshRecs.length > 0) {
    var latest = tshRecs[0];
    var target = profile.tshTargetEarly || 2.5;
    var status = latest.value <= target ? 'normal' : 'high';
    var suggestion = '';
    if (status === 'normal') {
      suggestion = 'TSH控制良好！当前剂量合适，继续保持每2-4周监测。优甲乐' + profile.thyroidDosageMcg + 'μg/天空腹服用。';
      result.overallLevel = 'good';
    } else {
      suggestion = 'TSH偏高（>' + target + ' mIU/L），建议尽快复查并咨询医生是否需要调整优甲乐剂量。TSH偏高可能影响胎儿神经系统发育，需认真对待。';
      result.overallLevel = 'warn';
    }

    result.tsh = {
      latest: latest.value,
      target: target,
      date: latest.date,
      status: status,
      suggestion: suggestion,
    };
  }

  // 体重分析
  if (weightRecs.length > 0 && profile.prePregnancyWeightKg) {
    var current = weightRecs[0].value;
    var preWeight = profile.prePregnancyWeightKg;
    var gain = (current - preWeight).toFixed(1);
    var bmi = preWeight / ((profile.heightCm / 100) * (profile.heightCm / 100));
    var targetGain = '11.5-16kg';
    if (bmi > 24) targetGain = '7-11.5kg';
    if (bmi < 18.5) targetGain = '12.5-18kg';

    var weightStatus = 'normal';
    var weightSuggestion = '体重增长在合理范围内。继续保持每周0.4-0.5kg的增速，均衡饮食加适量运动。';

    if (parseFloat(gain) < 0) {
      weightStatus = 'low';
      weightSuggestion = '体重下降需关注。孕早期可能因为孕吐导致体重下降，但如果持续下降请咨询医生。';
    }

    result.weight = {
      preWeight: preWeight,
      current: current,
      gain: gain,
      target: targetGain,
      status: weightStatus,
      suggestion: weightSuggestion,
    };
  }

  // 总体评估
  if (result.tsh && result.tsh.status === 'normal' && result.weight && result.weight.status === 'normal') {
    result.overall = '各项指标良好！TSH达标，体重增长合理。继续保持当前的管理方案。';
    result.overallLevel = 'good';
  } else if (result.tsh && result.tsh.status === 'high') {
    result.overall = 'TSH偏高需要重点关注。建议尽快复查并咨询医生。其他指标正常。';
    result.overallLevel = 'warn';
  } else {
    result.overall = '数据有限，建议增加记录频率以获得更准确的评估。';
    result.overallLevel = 'good';
  }

  // 建议汇总
  result.tips.push({ icon: '💊', text: '优甲乐' + profile.thyroidDosageMcg + 'μg/天，每天早晨空腹服用，等30-60分钟后进食' });
  result.tips.push({ icon: '🧪', text: '每2-4周检测TSH，目标<' + (profile.tshTargetEarly || 2.5) + ' mIU/L' });
  result.tips.push({ icon: '🍃', text: '继续补充叶酸400-800μg/天' });
  result.tips.push({ icon: '⚖️', text: '每周称一次体重（固定时间、固定状态）' });
  if (result.tsh && result.tsh.status === 'high') {
    result.tips.push({ icon: '⚠️', text: 'TSH偏高！本周内复查并咨询医生调药' });
  }

  return result;
}
