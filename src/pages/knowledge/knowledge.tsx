import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './knowledge.scss';

// 孕期知识库
var knowledgeData = [
  {
    category: '孕期营养',
    icon: '🥗',
    items: [
      { q: '孕早期（1-12周）饮食要点', a: '• 补充叶酸400-800μg/天\n• 保证碘摄入（海带、紫菜、加碘盐）\n• 蛋白质70-80g/天\n• 少食多餐，缓解孕吐\n• 避免生食、酒精、过量咖啡因\n• 孕吐严重可尝试苏打饼干、姜茶' },
      { q: '孕中期（13-27周）饮食要点', a: '• 蛋白质增至80-90g/天\n• 钙1000mg/天（牛奶、豆制品）\n• 铁27mg/天（红肉、动物肝脏）\n• DHA 200mg/天（深海鱼）\n• 每周增重约0.4-0.5kg' },
      { q: '孕晚期（28-40周）饮食要点', a: '• 蛋白质90-100g/天\n• 钙1200mg/天\n• 铁27mg/天\n• 控制盐分摄入，预防水肿\n• 少食多餐，避免胃灼热\n• 每周增重约0.4-0.5kg' },
      { q: '甲减孕妇饮食注意事项', a: '• 优甲乐空腹服用，等30-60分钟后进食\n• 服药后4小时内避免：高钙食物（牛奶、钙片）、高纤维食物、铁剂\n• 保证碘摄入但不过量\n• 避免大量生吃十字花科蔬菜（西兰花、卷心菜等影响碘吸收）\n• 保持规律作息和稳定情绪' },
    ]
  },
  {
    category: '产检指南',
    icon: '🏥',
    items: [
      { q: '首次产检（6-13周）', a: '• 建立孕期保健手册\n• 血常规、尿常规、血型\n• 肝肾功能、空腹血糖\n• 乙肝、梅毒、HIV筛查\n• TSH、甲状腺功能（甲减必查！）\n• B超确认宫内妊娠和胎心\n• NT检查（11-13周+6天）' },
      { q: '孕中期产检（14-27周）', a: '• 每4周一次常规产检\n• 唐筛/无创DNA（15-20周）\n• 大排畸B超（20-24周）\n• 糖耐量OGTT（24-28周）\n• 甲减孕妇：每2-4周查TSH\n• 体重、血压、宫高、胎心监测' },
      { q: '孕晚期产检（28-40周）', a: '• 28-36周：每2周一次\n• 36周后：每周一次\n• 胎心监护（NST）\n• B超评估胎儿大小和羊水\n• 骨盆测量\n• 甲减孕妇：继续每2-4周查TSH\n• 注意胎动计数（重要！）' },
      { q: '甲减孕妇特别注意事项', a: '• 孕早期TSH目标 < 2.5 mIU/L\n• 孕中期TSH目标 < 3.0 mIU/L\n• 孕晚期TSH目标 < 3.0 mIU/L\n• 优甲乐剂量孕期通常需要增加30-50%\n• 每次产检必查甲状腺功能\n• TSH升高需及时调整剂量\n• 产后优甲乐剂量需回调' },
    ]
  },
  {
    category: '孕期不适',
    icon: '🩺',
    items: [
      { q: '尿频怎么办', a: '• 孕期正常现象（子宫压迫膀胱）\n• 不要因为尿频减少饮水\n• 睡前1-2小时减少液体摄入\n• 排尿时身体前倾帮助排空\n• 如伴有尿痛、发热需就医排除尿路感染\n• 孕中期可能缓解，孕晚期再次出现' },
      { q: '孕吐/恶心怎么缓解', a: '• 早晨起床前吃干面包或苏打饼干\n• 少食多餐，避免空腹\n• 避免油腻、辛辣食物\n• 尝试姜茶、柠檬水\n• 补充维生素B6（需咨询医生）\n• 严重呕吐（妊娠剧吐）需就医' },
      { q: '腰背痛怎么办', a: '• 保持正确姿势，避免久站久坐\n• 使用孕妇靠垫\n• 适当散步和孕期瑜伽\n• 穿平底舒适鞋\n• 热敷酸痛部位\n• 严重疼痛需就医排除其他问题' },
      { q: '如何数胎动（28周后）', a: '• 每天固定时间（如晚饭后1小时）\n• 侧卧放松，手放腹部\n• 记录10次胎动所需时间\n• 正常：2小时内≥10次\n• 异常信号：\n  - 2小时内<10次\n  - 比平时减少50%以上\n  - 12小时<10次\n• 出现异常立即就医！' },
    ]
  },
  {
    category: '用药安全',
    icon: '💊',
    items: [
      { q: '孕期安全用药原则', a: '• 任何用药前必须咨询医生\n• 优甲乐：孕期安全，必须持续服用\n• 叶酸：必须补充\n• 铁剂/钙片：医生指导下补充\n• 避免：布洛芬、阿司匹林（除非医嘱）\n• 避免：某些抗生素（如四环素类）\n• 避免：中草药（成分不明确）\n• 外用药也需咨询医生' },
      { q: '优甲乐（左甲状腺素）使用要点', a: '• 每天固定时间服用（推荐早晨）\n• 空腹服用，等30-60分钟进食\n• 不要与钙片、铁剂同时服用（间隔4小时）\n• 不要擅自停药或调量\n• 定期监测TSH调整剂量\n• 孕期需求量通常增加\n• 产后需及时减量' },
    ]
  },
  {
    category: '运动与生活',
    icon: '🧘',
    items: [
      { q: '孕期可以运动吗', a: '• 可以！适度运动有益\n• 推荐：散步、游泳、孕妇瑜伽\n• 每天30分钟中等强度运动\n• 避免：剧烈运动、仰卧起坐、跳跃\n• 避免：骑马、滑雪、潜水等高风险运动\n• 出现腹痛、出血、头晕立即停止\n• 有流产史或早产风险需遵医嘱' },
      { q: '孕期睡眠建议', a: '• 左侧卧最佳（改善子宫血流）\n• 使用孕妇枕支撑腹部和腰部\n• 避免仰卧（孕晚期尤其重要）\n• 睡前避免大量饮水\n• 保持卧室通风凉爽\n• 白天适当运动有助于睡眠\n• 失眠严重需咨询医生' },
      { q: '孕期性生活', a: '• 正常妊娠可以适度进行\n• 避开孕早期（前3个月）和孕晚期（最后1个月）\n• 采用舒适姿势，避免压迫腹部\n• 如有出血、腹痛立即停止\n• 胎盘前置、宫颈机能不全者禁止\n• 有任何疑问咨询医生' },
    ]
  },
];

export default function Knowledge() {
  var _useState = useState(0);
  var tab = _useState[0];
  var setTab = _useState[1];
  var _useState2 = useState(null);
  var expanded = _useState2[0];
  var setExpanded = _useState2[1];

  var current = knowledgeData[tab];

  return (
    <View className="page">
      {/* 分类标签 */}
      <ScrollView className="cat-scroll" scrollX>
        <View className="cat-list">
          {knowledgeData.map(function(c, i) {
            return (
              <View key={i} className={'cat-tag ' + (tab === i ? 'active' : '')} onClick={function() { setTab(i); setExpanded(null); }}>
                <Text>{c.icon} {c.category}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* 知识列表 */}
      <ScrollView className="scroll" scrollY>
        <View className="card">
          {current.items.map(function(item, i) {
            var isOpen = expanded === tab + '-' + i;
            return (
              <View key={i} className="k-item">
                <View className="k-question" onClick={function() { setExpanded(isOpen ? null : tab + '-' + i); }}>
                  <Text className="k-q-text">{item.q}</Text>
                  <Text className="k-arrow">{isOpen ? '▾' : '▸'}</Text>
                </View>
                {isOpen && (
                  <View className="k-answer">
                    <Text className="k-a-text">{item.a}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
