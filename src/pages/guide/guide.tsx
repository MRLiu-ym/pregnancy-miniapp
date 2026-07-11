import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './guide.scss';

// 加载数据
var weekData = require('../../data/pregnancyData.js').weekData;

export default function Guide() {
  var _useState = useState(null);
  var profile = _useState[0]; var setProfile = _useState[1];
  var _useState2 = useState(null);
  var pregnancy = _useState2[0]; var setPregnancy = _useState2[1];
  var _useState3 = useState(null);
  var data = _useState3[0]; var setData = _useState3[1];
  var _useState4 = useState('mustDo');
  var tab = _useState4[0]; var setTab = _useState4[1];

  useLoad(function() {
    var p = Taro.getStorageSync('profile');
    if (p) {
      setProfile(p);
      var preg = calcPregnancy(p.lastMenstrualPeriod);
      setPregnancy(preg);
      var w = preg.currentWeek;
      if (w < 4) w = 4;
      if (w > 40) w = 40;
      var d = weekData[w] || weekData[4];
      setData(d);
    }
  });

  if (!profile || !data) {
    return (
      <View className="empty-page">
        <Text className="empty-icon">📋</Text>
        <Text className="empty-title">请先完善档案</Text>
        <Text className="empty-desc">在「档案」页面填写基本信息后{'\n'}即可查看每周指南</Text>
        <View className="btn" onClick={function() { Taro.switchTab({ url: '/pages/profile/profile' }); }}>
          <Text>去填写档案</Text>
        </View>
      </View>
    );
  }

  var tabs = [
    { key: 'mustDo', label: '✅ 必做', icon: '✅' },
    { key: 'mustNot', label: '🚫 禁做', icon: '🚫' },
    { key: 'momChanges', label: '🤰 妈妈', icon: '🤰' },
    { key: 'babyChanges', label: '👶 宝宝', icon: '👶' },
    { key: 'nutrition', label: '🥗 营养', icon: '🥗' },
    { key: 'recipes', label: '🍳 菜谱', icon: '🍳' },
    { key: 'husbandTasks', label: '👨 丈夫', icon: '👨' },
    { key: 'familyTasks', label: '👨‍👩‍👧 家人', icon: '👨‍👩‍👧' },
    { key: 'shopping', label: '🛒 购物', icon: '🛒' },
  ];

  var renderContent = function() {
    switch (tab) {
      case 'mustDo':
        return (
          <View className="content-list">
            {data.mustDo.map(function(item, i) {
              return <View key={i} className="content-item do"><Text className="item-bullet">☐</Text><Text className="item-text">{item}</Text></View>;
            })}
          </View>
        );
      case 'mustNot':
        return (
          <View className="content-list">
            {data.mustNot.map(function(item, i) {
              return <View key={i} className="content-item dont"><Text className="item-bullet">✕</Text><Text className="item-text">{item}</Text></View>;
            })}
          </View>
        );
      case 'momChanges':
        return (
          <View className="content-list">
            {data.momChanges.map(function(item, i) {
              return <View key={i} className="content-item info"><Text className="item-bullet">•</Text><Text className="item-text">{item}</Text></View>;
            })}
          </View>
        );
      case 'babyChanges':
        return (
          <View className="content-list">
            {data.babyChanges.map(function(item, i) {
              return <View key={i} className="content-item baby"><Text className="item-bullet">💕</Text><Text className="item-text">{item}</Text></View>;
            })}
          </View>
        );
      case 'nutrition':
        return (
          <View className="content-list">
            {data.nutrition.map(function(item, i) {
              return <View key={i} className="content-item nutrition-item"><Text className="item-bullet">🥗</Text><Text className="item-text">{item}</Text></View>;
            })}
          </View>
        );
      case 'recipes':
        return (
          <View className="recipe-list">
            {data.recipes.map(function(r, i) {
              return (
                <View key={i} className="recipe-card">
                  <View className="recipe-header">
                    <Text className="recipe-meal">{r.meal}</Text>
                    {r.thyroid && <Text className="thyroid-tag">甲减友好</Text>}
                  </View>
                  <Text className="recipe-name">{r.name}</Text>
                  <Text className="recipe-desc">{r.desc}</Text>
                </View>
              );
            })}
          </View>
        );
      case 'husbandTasks':
        return (
          <View className="content-list">
            {data.husbandTasks.map(function(item, i) {
              return <View key={i} className="content-item husband"><Text className="item-bullet">👨</Text><Text className="item-text">{item}</Text></View>;
            })}
          </View>
        );
      case 'familyTasks':
        return (
          <View className="content-list">
            {data.familyTasks.map(function(item, i) {
              return <View key={i} className="content-item family"><Text className="item-bullet">❤️</Text><Text className="item-text">{item}</Text></View>;
            })}
          </View>
        );
      case 'shopping':
        return (
          <View className="content-list">
            {data.shopping.map(function(item, i) {
              return <View key={i} className="content-item shopping-item"><Text className="item-bullet">🛒</Text><Text className="item-text">{item}</Text></View>;
            })}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="guide-page">
      {/* 顶部孕周信息 */}
      <View className="guide-header">
        <View className="guide-week-badge">
          <Text className="guide-week-num">{pregnancy.currentWeek}</Text>
          <Text className="guide-week-label">周</Text>
        </View>
        <View className="guide-header-info">
          <Text className="guide-stage">{data.stageName} · 第{pregnancy.currentWeek}周+{pregnancy.currentDay}天</Text>
          <Text className="guide-summary">{data.summary}</Text>
        </View>
      </View>

      {/* 分类标签 */}
      <ScrollView className="tab-scroll" scrollX>
        <View className="tab-list">
          {tabs.map(function(t) {
            return (
              <View key={t.key} className={'guide-tab ' + (tab === t.key ? 'active' : '')}
                onClick={function() { setTab(t.key); }}>
                <Text>{t.icon} {t.label}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* 内容区域 */}
      <ScrollView className="content-scroll" scrollY>
        <View className="content-card">
          {renderContent()}
        </View>

        {/* TSH 特别提醒 */}
        {data.thyroidNote && (
          <View className="thyroid-card">
            <View className="thyroid-title-row">
              <Text className="thyroid-icon">⚠️</Text>
              <Text className="thyroid-title">甲减特别提醒</Text>
            </View>
            <Text className="thyroid-text">{data.thyroidNote}</Text>
          </View>
        )}

        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
}

function calcPregnancy(lmp) {
  var lmpDate = new Date(lmp + 'T00:00:00');
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var daysSince = Math.floor((today.getTime() - lmpDate.getTime()) / 86400000);
  var week = Math.floor(daysSince / 7);
  var day = daysSince % 7;
  return { currentWeek: week, currentDay: day };
}
