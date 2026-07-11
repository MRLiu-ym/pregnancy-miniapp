import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './shopping.scss';

// 完整购物清单
var shoppingData = [
  {
    stage: '孕早期（1-12周）',
    icon: '🌱',
    items: [
      { name: '叶酸片/孕期综合维生素', note: '必备，每天服用', checked: false },
      { name: '舒适的平底鞋', note: '告别高跟鞋', checked: false },
      { name: '孕妇内衣（大1-2码）', note: '乳房会持续增大', checked: false },
      { name: '宽松的裤子/裙子', note: '腰部不要勒', checked: false },
      { name: '孕期护肤品（安全成分）', note: '避免维A酸、水杨酸', checked: false },
      { name: '苏打饼干/柠檬/姜茶', note: '缓解孕吐', checked: false },
      { name: '孕期书籍或App', note: '学习孕期知识', checked: false },
    ]
  },
  {
    stage: '孕中期（13-28周）',
    icon: '🌿',
    items: [
      { name: '孕妇牛仔裤/托腹裤', note: '肚子大了需要换', checked: false },
      { name: '孕妇装（连衣裙、上衣）', note: '舒适美观', checked: false },
      { name: '孕妇枕/侧睡枕', note: '改善睡眠质量', checked: false },
      { name: '妊娠纹预防霜/油', note: '每天涂抹', checked: false },
      { name: '孕妇运动服+瑜伽垫', note: '保持运动', checked: false },
      { name: '身体润肤霜', note: '孕期皮肤容易干燥', checked: false },
      { name: '托腹带（如需）', note: '缓解腰背压力', checked: false },
      { name: '孕妇靠垫/腰枕', note: '办公室和家里都需要', checked: false },
      { name: '胎教音乐/故事书', note: '宝宝能听到了', checked: false },
      { name: '婴儿床', note: '提前散味', checked: false },
      { name: '婴儿推车', note: '大件提前研究', checked: false },
      { name: '婴儿安全座椅', note: '出院必备', checked: false },
    ]
  },
  {
    stage: '孕晚期（29-40周）',
    icon: '🌳',
    items: [
      { name: '待产包收纳箱', note: '所有东西放一起', checked: false },
      { name: '产妇卫生巾（大号）', note: '产后恶露', checked: false },
      { name: '一次性内裤（多备）', note: '住院期间方便', checked: false },
      { name: '哺乳内衣', note: '方便喂奶', checked: false },
      { name: '产妇护理垫', note: '铺在床上', checked: false },
      { name: '防溢乳垫', note: '防止漏奶', checked: false },
      { name: '吸奶器', note: '电动或手动', checked: false },
      { name: '哺乳枕', note: '喂奶省力', checked: false },
      { name: '乳头霜', note: '预防皲裂', checked: false },
      { name: '新生儿衣物（52/59码）', note: '各3-4套，提前清洗', checked: false },
      { name: '新生儿袜子/帽子', note: '保暖', checked: false },
      { name: '包被/襁褓巾', note: '2-3条', checked: false },
      { name: '纸尿裤NB码', note: '先买1-2包，宝宝长得快', checked: false },
      { name: '婴儿湿巾（无酒精）', note: '大量囤', checked: false },
      { name: '婴儿沐浴露/洗发水', note: '温和无刺激', checked: false },
      { name: '婴儿浴盆', note: '带托架的', checked: false },
      { name: '婴儿指甲剪', note: '宝宝指甲长得快', checked: false },
      { name: '奶瓶+奶嘴（备用）', note: '2-3个', checked: false },
      { name: '奶粉小罐装（备用）', note: '不确定母乳够不够', checked: false },
      { name: '婴儿洗衣液', note: '专用温和配方', checked: false },
      { name: '水温计', note: '洗澡用', checked: false },
      { name: '婴儿棉签/护脐贴', note: '护理用', checked: false },
    ]
  },
  {
    stage: '入院证件（提前准备）',
    icon: '📋',
    items: [
      { name: '夫妻双方身份证', note: '原件+复印件', checked: false },
      { name: '医保卡/社保卡', note: '住院报销', checked: false },
      { name: '母子健康手册', note: '产检记录本', checked: false },
      { name: '所有产检报告', note: '按时间整理好', checked: false },
      { name: '银行卡/现金', note: '备用', checked: false },
      { name: '手机+充电器+充电宝', note: '保持联系', checked: false },
    ]
  },
];

export default function Shopping() {
  var _useState = useState(shoppingData);
  var list = _useState[0]; var setList = _useState[1];
  var _useState2 = useState(null);
  var expanded = _useState2[0]; var setExpanded = _useState2[1];

  var toggleCheck = function(stageIdx, itemIdx) {
    var newList = JSON.parse(JSON.stringify(list));
    newList[stageIdx].items[itemIdx].checked = !newList[stageIdx].items[itemIdx].checked;
    setList(newList);
    Taro.setStorageSync('shoppingList', newList);
  };

  useLoad(function() {
    var saved = Taro.getStorageSync('shoppingList');
    if (saved && saved.length > 0) {
      setList(saved);
    }
  });

  // 计算完成度
  var totalItems = 0; var checkedItems = 0;
  list.forEach(function(s) {
    s.items.forEach(function(i) {
      totalItems++;
      if (i.checked) checkedItems++;
    });
  });
  var progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <View className="page">
      {/* 进度条 */}
      <View className="progress-bar-wrap">
        <View className="progress-top">
          <Text className="progress-label">购物进度</Text>
          <Text className="progress-num">{checkedItems}/{totalItems} · {progress}%</Text>
        </View>
        <View className="progress-bar">
          <View className="progress-fill" style={'width:' + progress + '%'} />
        </View>
      </View>

      <ScrollView className="scroll" scrollY>
        {list.map(function(stage, si) {
          var checked = stage.items.filter(function(i) { return i.checked; }).length;
          var isOpen = expanded === si;
          return (
            <View key={si} className="stage-card">
              <View className="stage-header" onClick={function() { setExpanded(isOpen ? null : si); }}>
                <View className="stage-left">
                  <Text className="stage-icon">{stage.icon}</Text>
                  <View>
                    <Text className="stage-name">{stage.stage}</Text>
                    <Text className="stage-count">{checked}/{stage.items.length} 已购</Text>
                  </View>
                </View>
                <Text className="stage-arrow">{isOpen ? '▾' : '▸'}</Text>
              </View>
              {isOpen && (
                <View className="stage-items">
                  {stage.items.map(function(item, ii) {
                    return (
                      <View key={ii} className={'shop-item ' + (item.checked ? 'checked' : '')}
                        onClick={function() { toggleCheck(si, ii); }}>
                        <View className={'checkbox ' + (item.checked ? 'checked' : '')}>
                          {item.checked && <Text className="check-mark">✓</Text>}
                        </View>
                        <View className="item-info">
                          <Text className={'item-name ' + (item.checked ? 'done' : '')}>{item.name}</Text>
                          <Text className="item-note">{item.note}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
        <View style={{height:40}} />
      </ScrollView>
    </View>
  );
}
