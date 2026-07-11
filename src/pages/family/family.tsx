import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './family.scss';

var husbandData = [
  {
    title: '孕期全程 — 丈夫该做什么',
    icon: '👨',
    items: [
      '陪妻子产检 — 每次产检都尽量陪同，了解进展',
      '学习孕期知识 — 一起看书、用App，不要一问三不知',
      '承担家务 — 尤其是接触清洁剂、搬重物、做饭（油烟）',
      '关注情绪 — 孕期情绪波动大，多倾听少讲道理',
      '准备营养餐 — 了解每个阶段该吃什么、不该吃什么',
      '帮忙记录 — 帮忙记录体重、TSH、胎动等数据',
      '按摩放松 — 腰背酸痛时帮忙按摩',
      '学习分娩知识 — 了解产程、呼吸法、无痛分娩',
      '准备待产包 — 一起整理，不要全部交给妻子',
      '保持冷静 — 妻子需要的是安全感，不是一起焦虑',
    ]
  },
  {
    title: '妻子说"好累好难受"时',
    icon: '💬',
    items: [
      '❌ 不要说："别人不也这样过来了"',
      '❌ 不要说："你就是想太多了"',
      '❌ 不要说："多吃点，对孩子好"',
      '✅ 应该说："我知道你很辛苦"',
      '✅ 应该说："我能做什么帮到你？"',
      '✅ 应该说："你真的很了不起"',
      '✅ 行动：倒杯水、按按摩、做顿饭、陪散步',
    ]
  },
  {
    title: '丈夫也需要照顾好自己',
    icon: '🧘',
    items: [
      '你的焦虑也是正常的 — 对经济、对角色转变的担忧',
      '找兄弟或父亲聊聊 — 不要什么都自己扛',
      '保持自己的爱好 — 每周给自己一点独处时间',
      '和妻子一起学习 — 一起上课、一起看书',
      '提前了解陪产假政策 — 合理安排工作',
      '准备一个"爸爸包" — 入院时你也需要带的东西',
    ]
  },
];

var familyData = [
  {
    title: '给父母/公婆的建议',
    icon: '👨‍👩‍👧',
    items: [
      '尊重孕妇的意愿 — 不要以"为你好"的名义强迫',
      '不要过度进补 — 孕期营养均衡最重要，不是吃越多越好',
      '不要在孕妇面前吸烟 — 二手烟对胎儿有害',
      '帮忙做家务 — 尤其是接触化学清洁剂的工作',
      '学习新知识 — 很多育儿方法已经更新了',
      '多鼓励少批评 — 孕妇需要的是支持，不是说教',
      '尊重小两口的决定 — 关于分娩方式、月子方式等',
    ]
  },
  {
    title: '家人在不同阶段可以帮什么',
    icon: '📋',
    items: [
      '孕早期：帮忙做饭（少油烟）、采购新鲜食材',
      '孕中期：帮忙准备婴儿房、选购婴儿用品',
      '孕晚期：帮忙准备待产包、随时待命',
      '产后：帮忙做饭、做家务、让产妇多休息',
    ]
  },
];

export default function Family() {
  var _useState = useState('husband');
  var tab = _useState[0]; var setTab = _useState[1];

  var data = tab === 'husband' ? husbandData : familyData;

  return (
    <View className="page">
      {/* 切换 */}
      <View className="tab-row">
        <View className={'switch-tab ' + (tab === 'husband' ? 'active' : '')}
          onClick={function() { setTab('husband'); }}>
          <Text>👨 丈夫专区</Text>
        </View>
        <View className={'switch-tab ' + (tab === 'family' ? 'active' : '')}
          onClick={function() { setTab('family'); }}>
          <Text>👨‍👩‍👧 家人专区</Text>
        </View>
      </View>

      <ScrollView className="scroll" scrollY>
        {data.map(function(section, si) {
          return (
            <View key={si} className="card">
              <View className="card-header">
                <Text className="card-icon">{section.icon}</Text>
                <Text className="card-title">{section.title}</Text>
              </View>
              <View className="item-list">
                {section.items.map(function(item, ii) {
                  return (
                    <View key={ii} className="family-item">
                      <Text className="item-dot">•</Text>
                      <Text className="item-text">{item}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}

        <View className="card highlight-card">
          <Text className="highlight-title">💡 最重要的一件事</Text>
          <Text className="highlight-text">
            {tab === 'husband' 
              ? '她不需要你解决所有问题，她需要的是你陪在她身边，让她知道她不是一个人在经历这一切。你的陪伴就是最好的支持。'
              : '最好的帮助不是"我都是为你好"，而是"你需要我怎么做"。尊重和理解比任何补品都重要。'
            }
          </Text>
        </View>

        <View style={{height:40}} />
      </ScrollView>
    </View>
  );
}
