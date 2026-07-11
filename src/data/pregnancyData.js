/**
 * 孕期40周完整数据库
 * 每周包含：必做、禁做、孕妇变化、宝宝变化、营养重点、推荐菜谱、丈夫任务、家人任务、购物提示、甲减提醒
 */

var weekData = {
  // ==================== 孕早期 1-12周 ====================
  4: {
    trimester: 1, stageName: '孕早期',
    summary: '刚确认怀孕，开始补充叶酸，预约第一次产检',
    mustDo: [
      '服用叶酸400-800μg/天',
      '确认怀孕后尽快预约第一次产检',
      '了解单位产假政策和生育保险',
      '保持心情平稳，避免焦虑',
      '每天保证充足睡眠8-9小时',
    ],
    mustNot: [
      '禁止饮酒和吸烟（包括二手烟）',
      '禁止服用未经医生许可的药物',
      '禁止剧烈运动和重物提举',
      '禁止桑拿、热水浴（水温不超过38℃）',
      '禁止接触猫砂（弓形虫风险）',
    ],
    momChanges: [
      '月经停止，乳房胀痛',
      '可能开始早孕反应：恶心、疲劳',
      '基础体温持续偏高',
      '情绪波动较大',
    ],
    babyChanges: [
      '受精卵着床完成',
      '细胞快速分裂',
      '神经管开始形成',
      '约0.1mm，肉眼不可见',
    ],
    nutrition: [
      '叶酸：400-800μg/天（最重要！）',
      '如果孕吐严重，少食多餐',
      '苏打饼干、柠檬水可缓解不适',
      '每天保证一杯奶、一个蛋',
    ],
    recipes: [
      { meal: '早餐', name: '全麦面包+牛奶+香蕉', desc: '简单易消化，缓解晨吐', thyroid: true },
      { meal: '午餐', name: '清汤面条+蒸蛋羹', desc: '少油少盐，好入口', thyroid: true },
      { meal: '晚餐', name: '小米粥+炒青菜+蒸鱼', desc: '清淡营养', thyroid: true },
    ],
    husbandTasks: [
      '陪妻子去医院确认怀孕',
      '开始了解孕期知识',
      '主动承担家务',
      '如果妻子孕吐，准备苏打饼干和柠檬水',
    ],
    familyTasks: [
      '家人避免在孕妇面前吸烟',
      '可以帮忙准备营养餐食',
      '不要给孕妇太多压力',
    ],
    shopping: [
      '叶酸片/孕期维生素',
      '舒适的平底鞋',
      '宽松的内衣',
    ],
    thyroidNote: '如果还没查TSH，请尽快检查。确认怀孕后优甲乐剂量通常需要增加25-30%。继续每天空腹服用。',
  },

  5: {
    trimester: 1, stageName: '孕早期',
    summary: '胚胎心脏开始发育，继续补充叶酸，注意休息',
    mustDo: [
      '继续服用叶酸',
      '预约孕6-8周的首次B超',
      '开始记录基础体温和身体状况',
      '办理母子健康手册（社区卫生服务中心）',
    ],
    mustNot: [
      '避免接触有害化学物质（染发、美甲、强力清洁剂）',
      '避免X光等放射性检查',
      '禁酒、禁烟',
      '避免生食和未消毒乳制品',
    ],
    momChanges: [
      '早孕反应可能加重',
      '乳房持续胀痛、乳晕变深',
      '容易疲劳嗜睡',
      '尿频开始出现',
    ],
    babyChanges: [
      '心脏开始形成原始心管',
      '神经管继续发育',
      '胚胎约1.5-2mm',
    ],
    nutrition: [
      '继续补充叶酸',
      '如果孕吐严重，吃干的食物比湿的好',
      '避免空腹，随身带小零食',
      '姜茶可缓解恶心',
    ],
    recipes: [
      { meal: '早餐', name: '苏打饼干+温牛奶', desc: '缓解晨吐', thyroid: true },
      { meal: '午餐', name: '白粥+蒸蛋+清炒时蔬', desc: '温和不刺激', thyroid: true },
      { meal: '晚餐', name: '番茄鸡蛋面+凉拌黄瓜', desc: '开胃易消化', thyroid: true },
    ],
    husbandTasks: [
      '了解早孕反应，不要觉得妻子"矫情"',
      '多关心、多倾听，少讲道理',
      '准备健康零食放在家里和妻子包里',
    ],
    familyTasks: [
      '帮忙分担家务',
      '不要强迫孕妇吃不想吃的东西',
    ],
    shopping: [
      '苏打饼干、柠檬、姜茶',
      '舒适的孕妇内衣',
    ],
    thyroidNote: 'TSH目标<2.5 mIU/L。如果还没查，请本周内检查。甲减会增加流产风险，必须重视。',
  },

  6: {
    trimester: 1, stageName: '孕早期',
    summary: '首次B超确认胎心，关键器官发育期，格外小心',
    mustDo: [
      '首次B超检查（6-8周，确认宫内妊娠和胎心）',
      '继续服用叶酸',
      'TSH检查（甲减孕妇必查）',
      '保持充足睡眠',
    ],
    mustNot: [
      '避免所有酒精（包括料酒未挥发的菜）',
      '避免咖啡因超200mg/天（约1杯咖啡）',
      '避免接触杀虫剂、染发剂',
      '避免泡温泉、桑拿',
    ],
    momChanges: [
      '孕吐可能达到高峰',
      '对气味特别敏感',
      '乳房继续增大',
      '容易头晕乏力',
    ],
    babyChanges: [
      '心脏开始跳动！',
      '神经管闭合',
      '四肢芽出现',
      '约2-4mm，像一粒芝麻',
    ],
    nutrition: [
      '如果孕吐严重，能吃下什么就吃什么',
      '保证饮水，防止脱水',
      '维生素B6可缓解孕吐（咨询医生）',
      '含姜的食物有助缓解',
    ],
    recipes: [
      { meal: '早餐', name: '烤馒头片+蜂蜜柠檬水', desc: '缓解孕吐', thyroid: true },
      { meal: '午餐', name: '鸡汤面+水煮西兰花', desc: '有营养又好消化', thyroid: true },
      { meal: '晚餐', name: '南瓜小米粥+蒸鱼', desc: '温和滋补', thyroid: true },
    ],
    husbandTasks: [
      '陪妻子做第一次B超（听到胎心是很珍贵的时刻）',
      '妻子孕吐严重时代替做饭（减少油烟刺激）',
      '多拥抱和鼓励',
    ],
    familyTasks: [
      '做饭时少用油烟大的烹饪方式',
      '帮忙采购新鲜食材',
    ],
    shopping: [
      '孕期书籍或App',
      '孕妇零食（坚果、水果）',
    ],
    thyroidNote: '首次B超时一定要同时查TSH！孕早期TSH>2.5需要立即调药。优甲乐空腹服用，等30-60分钟再吃早餐。',
  },

  7: {
    trimester: 1, stageName: '孕早期',
    summary: '胚胎快速发育，继续关注早孕反应，准备建档',
    mustDo: [
      '如果还没做首次B超，本周安排',
      '继续服用叶酸',
      '了解产检医院并准备建档材料',
      '开始记录孕期日记或使用App记录',
    ],
    mustNot: [
      '避免搬重物和剧烈运动',
      '避免长时间站立',
      '避免吃生冷食物',
    ],
    momChanges: [
      '子宫增大到约拳头大小',
      '白带增多（正常现象）',
      '可能出现便秘',
      '情绪波动明显',
    ],
    babyChanges: [
      '大脑快速发育',
      '面部特征开始形成',
      '手臂和腿继续生长',
      '约1cm，像一颗蓝莓',
    ],
    nutrition: [
      '多喝水，预防便秘',
      '增加膳食纤维：全谷物、蔬菜、水果',
      '继续补充叶酸',
      '适量坚果补充维生素E',
    ],
    recipes: [
      { meal: '早餐', name: '燕麦粥+煮鸡蛋+苹果', desc: '高纤维防便秘', thyroid: true },
      { meal: '午餐', name: '糙米饭+清蒸鱼+炒菠菜', desc: '补铁补蛋白', thyroid: false },
      { meal: '晚餐', name: '杂粮粥+豆腐炒青菜', desc: '清淡营养', thyroid: true },
    ],
    husbandTasks: [
      '帮忙准备建档所需材料',
      '多陪妻子散步（温和运动）',
      '接受妻子情绪波动，不要不耐烦',
    ],
    familyTasks: [
      '帮忙准备健康餐食',
      '不要频繁询问"反应还大吗"（增加压力）',
    ],
    shopping: [
      '宽松舒适的裤子/裙子',
      '孕期护肤品（选择安全成分）',
    ],
    thyroidNote: '注意：高纤维食物会影响优甲乐吸收。服药后至少等1小时再吃高纤维早餐。如果便秘严重，多喝水比吃纤维更重要。',
  },

  8: {
    trimester: 1, stageName: '孕早期',
    summary: '器官形成关键期，建档准备，避免一切有害物质',
    mustDo: [
      '完成首次B超和建档检查',
      '查血常规、尿常规、肝肾功能、甲功',
      '继续服用叶酸',
      '选择产检医院并建档',
    ],
    mustNot: [
      '绝对禁止酒精和烟草',
      '避免X光检查',
      '避免吃深海大型鱼类（高汞）',
      '避免自行服用任何药物',
    ],
    momChanges: [
      '子宫增大压迫膀胱，尿频明显',
      '孕吐可能持续',
      '腰部可能开始不适',
      '乳房明显增大',
    ],
    babyChanges: [
      '所有主要器官开始形成',
      '手指脚趾开始分离',
      '尾巴开始消失',
      '约1.5-2cm，像一颗葡萄',
    ],
    nutrition: [
      '蛋白质需求开始增加',
      '保证碘摄入（碘盐、海带）',
      '继续补充叶酸',
      '少食多餐，不要空腹',
    ],
    recipes: [
      { meal: '早餐', name: '全麦三明治+牛奶+猕猴桃', desc: '维C丰富', thyroid: true },
      { meal: '午餐', name: '紫菜蛋花汤+清蒸鸡胸+米饭', desc: '补碘补蛋白', thyroid: false },
      { meal: '晚餐', name: '豆腐菌菇汤+炒西兰花+杂粮饭', desc: '营养全面', thyroid: true },
    ],
    husbandTasks: [
      '陪同建档，了解整个产检流程',
      '开始了解生育保险报销流程',
      '给妻子多一些赞美（孕期情绪需要）',
    ],
    familyTasks: [
      '帮助准备建档所需的证件材料',
      '了解孕期禁忌，避免好心办坏事',
    ],
    shopping: [
      '平底鞋（非常重要！）',
      '孕妇打底裤',
    ],
    thyroidNote: '建档时务必告知医生你的甲减情况。TSH检查结果出来后发给我，我帮你分析是否需要调药。',
  },

  9: {
    trimester: 1, stageName: '孕早期',
    summary: '胚胎正式成为"胎儿"，早孕反应开始缓解',
    mustDo: [
      '继续服用叶酸',
      '如果TSH异常，本周复查',
      '开始温和运动（散步15-20分钟/天）',
      '保证每天8小时睡眠',
    ],
    mustNot: [
      '避免接触猫砂',
      '避免吃生肉、生鱼片',
      '避免含汞高的鱼类（鲨鱼、旗鱼、金枪鱼）',
    ],
    momChanges: [
      '早孕反应可能开始减轻',
      '情绪趋于稳定',
      '可能出现轻微头晕',
      '皮肤可能变好或变差（激素影响）',
    ],
    babyChanges: [
      '正式从胚胎变为"胎儿"',
      '所有器官已形成，开始发育成熟',
      '开始有轻微运动（你还感觉不到）',
      '约2.5cm，像一颗草莓',
    ],
    nutrition: [
      '食欲开始恢复，但要控制质量',
      '增加优质蛋白：鱼、鸡、蛋、豆制品',
      '每天水果不超过300g',
      '继续补充叶酸',
    ],
    recipes: [
      { meal: '早餐', name: '红枣小米粥+水煮蛋', desc: '补气养血', thyroid: true },
      { meal: '午餐', name: '三文鱼时蔬沙拉+全麦面包', desc: 'DHA丰富', thyroid: true },
      { meal: '晚餐', name: '番茄牛腩煲+炒青菜+米饭', desc: '补铁补蛋白', thyroid: true },
    ],
    husbandTasks: [
      '陪妻子每天散步',
      '开始了解孕期营养知识',
      '注意妻子的情绪变化',
    ],
    familyTasks: [
      '做饭时注意食材新鲜、煮熟',
      '可以帮忙购买新鲜蔬果',
    ],
    shopping: [
      '孕妇综合维生素（咨询医生后购买）',
      '舒适的鞋子',
    ],
    thyroidNote: '孕9周左右TSH可能会波动。如果还没查过TSH，这周一定要查。目标<2.5。',
  },

  10: {
    trimester: 1, stageName: '孕早期',
    summary: '进入孕早期最后阶段，准备NT检查预约',
    mustDo: [
      '预约NT检查（11-13周+6天做）',
      '继续服用叶酸',
      'TSH复查（如距上次超过2周）',
      '每天适当活动',
    ],
    mustNot: [
      '避免吃山楂、桂圆',
      '避免薏米',
      '避免长时间使用电脑不休息',
    ],
    momChanges: [
      '早孕反应明显减轻',
      '精力逐渐恢复',
      '可能出现便秘',
      '情绪好转',
    ],
    babyChanges: [
      '性别开始分化（外观还看不出）',
      '手指脚趾完全分离',
      '开始吞咽羊水',
      '约3.5cm，像一颗金桔',
    ],
    nutrition: [
      '增加钙摄入：牛奶、酸奶、豆腐',
      '每天1-2份水果，不要过量',
      '适量坚果',
      '多喝水防便秘',
    ],
    recipes: [
      { meal: '早餐', name: '酸奶+燕麦+蓝莓+核桃', desc: '补钙补脑', thyroid: false },
      { meal: '午餐', name: '鲈鱼清蒸+炒西兰花+糙米饭', desc: 'DHA+钙', thyroid: true },
      { meal: '晚餐', name: '菠菜猪肝汤+番茄炒蛋+米饭', desc: '补铁补血', thyroid: true },
    ],
    husbandTasks: [
      '帮忙预约NT检查',
      '开始计划孕中期的准备工作',
      '和妻子一起了解孕期营养',
    ],
    familyTasks: [
      '如果家里有宠物，帮忙清理猫砂',
      '做饭注意营养搭配',
    ],
    shopping: [
      '孕妇装（肚子快开始显了）',
      '妊娠纹预防霜',
    ],
    thyroidNote: '如果TSH一直偏高，本周一定要复查并咨询医生调药。孕早期即将结束，TSH控制情况直接影响胎儿大脑发育。',
  },

  11: {
    trimester: 1, stageName: '孕早期',
    summary: 'NT检查周！重要排畸筛查',
    mustDo: [
      'NT检查（11-13周+6天，重要！）',
      '继续服用叶酸',
      'TSH检查',
      '可以通知直属领导怀孕（NT通过后更稳妥）',
    ],
    mustNot: [
      '避免剧烈运动',
      '避免长时间排队或站立',
      '避免吃未煮熟的食物',
    ],
    momChanges: [
      '小腹开始微微隆起',
      '早孕反应基本消失',
      '精力明显恢复',
      '可能出现轻微头晕',
    ],
    babyChanges: [
      'NT检查可以看得很清楚了',
      '开始有规律运动',
      '肾脏开始产生尿液',
      '约5cm，像一颗李子',
    ],
    nutrition: [
      '恢复正常饮食但注意质量',
      '每天蛋白质70-80g',
      '多吃深色蔬菜',
      '继续补叶酸',
    ],
    recipes: [
      { meal: '早餐', name: '牛奶+全麦面包+煎蛋+番茄', desc: '均衡营养', thyroid: true },
      { meal: '午餐', name: '虾仁西兰花+米饭+紫菜汤', desc: '高蛋白高钙', thyroid: false },
      { meal: '晚餐', name: '红烧鱼块+蒜蓉菠菜+杂粮饭', desc: '补DHA补铁', thyroid: true },
    ],
    husbandTasks: [
      '陪妻子做NT检查',
      'NT通过后可以开始告诉亲友好消息',
      '了解孕中期需要注意的事项',
    ],
    familyTasks: [
      'NT检查通过后可以帮忙通知亲友',
      '注意不要给孕妇太大压力',
    ],
    shopping: [
      '孕妇牛仔裤/托腹裤',
      '孕妇抱枕/侧睡枕',
    ],
    thyroidNote: 'NT检查时同步查TSH。孕早期最后的机会确保TSH<2.5。如果需要调药，医生会告诉你新剂量。',
  },

  12: {
    trimester: 1, stageName: '孕早期',
    summary: '孕早期最后一周，全面检查，准备进入孕中期',
    mustDo: [
      '如果还没做NT，这周最后机会',
      '全面血检：血常规、甲功、肝肾功能',
      '继续服用叶酸',
      '开始涂抹妊娠纹预防产品',
    ],
    mustNot: [
      '避免情绪大起大落',
      '避免熬夜',
      '避免暴饮暴食',
    ],
    momChanges: [
      '小腹明显隆起（虽然别人可能还看不出）',
      '孕早期即将结束，流产风险大幅降低',
      '食欲和精力恢复正常',
      '可能出现妊娠线',
    ],
    babyChanges: [
      '所有器官已形成，接下来是生长和成熟',
      '可以握拳、皱眉',
      '外生殖器开始分化',
      '约6cm，约14-20g',
    ],
    nutrition: [
      '孕早期即将结束，可以恢复正常饮食节奏',
      '注意均衡营养',
      '开始增加蛋白质摄入',
      '每天保证足量水分',
    ],
    recipes: [
      { meal: '早餐', name: '豆浆+杂粮煎饼+水果', desc: '植物蛋白丰富', thyroid: false },
      { meal: '午餐', name: '红烧牛肉面+凉拌木耳', desc: '补铁补血', thyroid: true },
      { meal: '晚餐', name: '鲫鱼豆腐汤+炒时蔬+米饭', desc: '优质蛋白', thyroid: true },
    ],
    husbandTasks: [
      '总结孕早期经验，准备进入孕中期',
      '了解孕中期产检项目和时间',
      '给妻子一个孕早期顺利度过的庆祝',
    ],
    familyTasks: [
      '了解孕中期饮食要点',
      '帮助准备营养餐食',
    ],
    shopping: [
      '妊娠纹霜/油',
      '孕妇装',
      '孕妇枕',
    ],
    thyroidNote: '孕早期结束！TSH目标从<2.5调整到<3.0（孕中期标准）。和医生确认优甲乐剂量是否需要调整。',
  },

  // ==================== 孕中期 13-28周 ====================
  13: {
    trimester: 2, stageName: '孕中期',
    summary: '进入孕中期！胃口恢复，精力充沛，开始享受孕期',
    mustDo: [
      '预约唐筛/无创DNA（15-20周做）',
      'TSH复查',
      '开始孕期运动计划（散步、孕妇瑜伽）',
      '了解无创DNA和唐筛的区别，做出选择',
    ],
    mustNot: [
      '避免长时间仰卧',
      '避免突然剧烈运动',
      '避免穿过紧的衣物',
    ],
    momChanges: [
      '进入孕中期，精力明显好转',
      '肚子开始明显隆起',
      '可能出现妊娠纹',
      '头发和指甲长得更快',
    ],
    babyChanges: [
      '可以分辨性别（B超可能看出来）',
      '长出细软胎毛',
      '开始有指纹',
      '约7.5cm，约25g',
    ],
    nutrition: [
      '蛋白质需求增加：每天80g',
      '钙1000mg/天',
      'DHA 200mg/天',
      '每周增重目标：0.4-0.5kg',
    ],
    recipes: [
      { meal: '早餐', name: '牛奶+燕麦+鸡蛋+蓝莓', desc: '高钙高蛋白', thyroid: false },
      { meal: '午餐', name: '三文鱼饭+炒菠菜+味噌汤', desc: 'DHA+铁', thyroid: false },
      { meal: '晚餐', name: '番茄牛腩+西兰花+糙米饭', desc: '补铁补钙', thyroid: true },
    ],
    husbandTasks: [
      '了解无创DNA和唐筛的区别，一起做决定',
      '陪妻子开始规律运动',
      '开始计划babymoon旅行',
    ],
    familyTasks: [
      '帮忙采购营养食材',
      '了解孕中期饮食需求',
    ],
    shopping: [
      '孕妇运动服',
      '孕妇瑜伽垫',
    ],
    thyroidNote: '进入孕中期，TSH目标调整为<3.0 mIU/L。优甲乐剂量可能需要微调。继续每2-4周监测TSH。',
  },

  14: {
    trimester: 2, stageName: '孕中期',
    summary: '孕中期黄金期，精力最好，开始规律运动',
    mustDo: [
      '预约唐筛（15-20周）',
      'TSH复查',
      '每天散步30分钟',
      '开始涂抹妊娠纹产品',
    ],
    mustNot: [
      '避免久坐不动',
      '避免吃高糖食物',
      '避免穿高跟鞋',
    ],
    momChanges: [
      '肚子持续变大',
      '皮肤可能出现色素沉着',
      '精力充沛，心情好',
      '可能出现鼻塞（孕期鼻炎）',
    ],
    babyChanges: [
      '可以做出吸吮动作',
      '肝脏开始产生胆汁',
      '脾脏开始产生红细胞',
      '约9cm，约45g',
    ],
    nutrition: [
      '增加优质蛋白',
      '每天吃一把坚果',
      '多吃富含维C的水果（帮助铁吸收）',
      '控制糖分摄入',
    ],
    recipes: [
      { meal: '早餐', name: '全麦吐司+牛油果+煮蛋+橙汁', desc: '健康脂肪+维C', thyroid: true },
      { meal: '午餐', name: '鸡胸肉沙拉+藜麦+烤蔬菜', desc: '高蛋白低脂', thyroid: true },
      { meal: '晚餐', name: '清蒸鳕鱼+炒芦笋+红薯', desc: 'DHA+叶酸', thyroid: true },
    ],
    husbandTasks: [
      '陪妻子每天散步',
      '开始了解分娩知识',
      '和妻子一起参加孕妇学校',
    ],
    familyTasks: [
      '支持孕妇的运动计划',
      '帮忙准备健康餐食',
    ],
    shopping: [
      '孕妇运动鞋',
      '孕期书籍',
    ],
    thyroidNote: '继续每2-4周查TSH。如果数值稳定，可以和医生商量延长复查间隔。',
  },

  15: {
    trimester: 2, stageName: '孕中期',
    summary: '唐筛/无创DNA检查周',
    mustDo: [
      '唐筛或NIPT无创DNA检查（15-20周）',
      'TSH复查',
      '继续规律运动',
      '开始了解分娩医院',
    ],
    mustNot: [
      '检查前不要过度焦虑',
      '避免高糖饮料和零食',
      '避免长时间保持一个姿势',
    ],
    momChanges: [
      '肚子明显可见',
      '可能开始感受到轻微胎动（像蝴蝶扇翅膀）',
      '食欲旺盛',
      '皮肤红润有光泽',
    ],
    babyChanges: [
      '可以活动关节',
      '对光线有反应',
      '味蕾开始形成',
      '约11cm，约70g',
    ],
    nutrition: [
      '控制体重增速：每周0.4-0.5kg',
      '多吃含铁食物：红肉、菠菜、黑木耳',
      '搭配维C促进铁吸收',
      '每天一杯牛奶补钙',
    ],
    recipes: [
      { meal: '早餐', name: '红枣豆浆+全麦馒头+炒蛋', desc: '补铁补血', thyroid: false },
      { meal: '午餐', name: '牛肉炒西兰花+紫菜汤+米饭', desc: '铁+钙', thyroid: false },
      { meal: '晚餐', name: '清蒸鲈鱼+蒜蓉菠菜+小米饭', desc: 'DHA+叶酸', thyroid: true },
    ],
    husbandTasks: [
      '陪妻子做唐筛/NIPT',
      '等待结果期间保持平静，不要制造焦虑',
      '开始考察分娩医院',
    ],
    familyTasks: [
      '保持轻松愉快的家庭氛围',
      '不要频繁询问检查结果',
    ],
    shopping: [
      '孕妇牛仔裤/托腹裤（肚子大了需要换）',
      '孕妇内衣（尺码可能又变了）',
    ],
    thyroidNote: 'TSH稳定的话可以和医生商量每4周查一次。但如果有任何不适或调整药量，恢复每2周监测。',
  },

  16: {
    trimester: 2, stageName: '孕中期',
    summary: '可能感受到第一次胎动！',
    mustDo: [
      '关注胎动感觉（初产妇通常18-20周感受到）',
      'TSH复查',
      '预约大排畸B超（20-24周）',
      '开始选购婴儿大件',
    ],
    mustNot: [
      '避免提重物',
      '避免突然弯腰或转身',
      '避免长时间坐车不休息',
    ],
    momChanges: [
      '子宫上升到肚脐和耻骨之间',
      '可能感受到第一次胎动！',
      '腰背可能开始不适',
      '鼻塞可能持续',
    ],
    babyChanges: [
      '开始有表情：皱眉、眯眼',
      '骨骼开始硬化',
      '腿部发育追上手臂',
      '约13cm，约100g',
    ],
    nutrition: [
      '钙需求增加：每天1000mg',
      '多吃奶制品、豆制品、芝麻',
      '继续控制体重增速',
      '少食多餐，避免胃胀',
    ],
    recipes: [
      { meal: '早餐', name: '芝麻糊+鸡蛋+全麦面包', desc: '高钙', thyroid: true },
      { meal: '午餐', name: '豆腐虾仁煲+炒青菜+米饭', desc: '钙+蛋白', thyroid: false },
      { meal: '晚餐', name: '排骨莲藕汤+炒西兰花+杂粮饭', desc: '滋补', thyroid: true },
    ],
    husbandTasks: [
      '和妻子一起感受胎动',
      '开始研究婴儿床、推车等大件',
      '注意妻子的腰背，帮忙按摩',
    ],
    familyTasks: [
      '帮忙研究婴儿用品',
      '注意孕妇的饮食营养',
    ],
    shopping: [
      '开始研究婴儿床',
      '开始研究婴儿推车',
      '孕妇靠垫/腰枕',
    ],
    thyroidNote: '如果感觉心悸、手抖或特别疲劳，可能是优甲乐剂量偏高，查TSH确认。',
  },

  17: {
    trimester: 2, stageName: '孕中期',
    summary: '孕中期平稳期，享受孕期，继续产检',
    mustDo: [
      '继续规律产检',
      'TSH复查',
      '保持每天运动',
      '开始涂抹防妊娠纹产品',
    ],
    mustNot: [
      '避免吃太多甜食和零食',
      '避免熬夜',
      '避免情绪波动过大',
    ],
    momChanges: [
      '食欲旺盛，注意控制',
      '肚子继续长大',
      '可能出现腿部抽筋',
      '皮肤干燥发痒',
    ],
    babyChanges: [
      '脂肪开始积累',
      '循环系统和泌尿系统工作正常',
      '可以听到外界声音',
      '约14cm，约140g',
    ],
    nutrition: [
      '控制总热量，质量比数量重要',
      '补钙防抽筋',
      '多吃含钾食物：香蕉、土豆',
      '每天饮水2000ml',
    ],
    recipes: [
      { meal: '早餐', name: '香蕉奶昔+燕麦+坚果', desc: '补钾防抽筋', thyroid: false },
      { meal: '午餐', name: '鸡腿菇炒肉+番茄蛋汤+米饭', desc: '均衡营养', thyroid: true },
      { meal: '晚餐', name: '清蒸鱼+炒豆苗+紫薯', desc: '高蛋白低脂', thyroid: true },
    ],
    husbandTasks: [
      '如果妻子腿抽筋，帮忙按摩',
      '开始给肚子里的宝宝讲故事/放音乐',
      '和妻子一起选择婴儿用品',
    ],
    familyTasks: [
      '帮忙按摩（如果孕妇需要）',
      '保持家中环境舒适',
    ],
    shopping: [
      '身体润肤霜（防皮肤干燥）',
      '孕妇托腹带（如果需要）',
    ],
    thyroidNote: '甲减孕妇钙片和优甲乐要间隔至少4小时！钙会影响优甲乐吸收。建议优甲乐早上空腹吃，钙片中午或晚上吃。',
  },

  18: {
    trimester: 2, stageName: '孕中期',
    summary: '胎动越来越明显，开始胎教',
    mustDo: [
      '关注并记录胎动',
      'TSH复查',
      '预约大排畸B超',
      '开始胎教：音乐、故事、对话',
    ],
    mustNot: [
      '避免长时间站立不动',
      '避免穿紧身衣物',
      '避免嘈杂环境（宝宝能听到了）',
    ],
    momChanges: [
      '胎动越来越明显',
      '肚子明显凸出',
      '可能出现妊娠线（腹部中线颜色加深）',
      '食欲很好',
    ],
    babyChanges: [
      '听觉发育，能听到妈妈的心跳和声音',
      '开始有睡眠-清醒周期',
      '会打嗝了',
      '约15cm，约200g',
    ],
    nutrition: [
      '每天DHA 200mg',
      '多吃深海鱼（三文鱼、沙丁鱼）',
      '继续补钙补铁',
      '多喝水',
    ],
    recipes: [
      { meal: '早餐', name: '三文鱼三明治+牛奶+水果', desc: 'DHA丰富', thyroid: false },
      { meal: '午餐', name: '红烧排骨+炒青菜+米饭+紫菜汤', desc: '补钙补铁', thyroid: true },
      { meal: '晚餐', name: '番茄鱼片汤+炒时蔬+杂粮饭', desc: '易消化', thyroid: true },
    ],
    husbandTasks: [
      '每天和宝宝说话/讲故事（宝宝能听到！）',
      '帮忙记录胎动',
      '开始组装婴儿房',
    ],
    familyTasks: [
      '也可以和宝宝说说话',
      '帮助准备婴儿房',
    ],
    shopping: [
      '胎教音乐/故事书',
      '婴儿房装饰',
    ],
    thyroidNote: '优甲乐剂量稳定的话，可以每月查一次TSH。但如果有任何不适，随时复查。',
  },

  19: {
    trimester: 2, stageName: '孕中期',
    summary: '孕中期过半，准备大排畸检查',
    mustDo: [
      '确认大排畸B超预约（20-24周）',
      'TSH复查',
      '继续胎教和运动',
      '开始了解分娩方式',
    ],
    mustNot: [
      '避免长途旅行不休息',
      '避免吃未清洗的蔬果',
      '避免接触化学清洁剂',
    ],
    momChanges: [
      '子宫到达肚脐位置',
      '可能开始有假性宫缩（无痛、不规律，正常）',
      '皮肤可能出现黄褐斑',
      '头发浓密有光泽',
    ],
    babyChanges: [
      '皮肤被胎脂覆盖保护',
      '开始长眉毛和睫毛',
      '大脑发育加速',
      '约16cm，约250g',
    ],
    nutrition: [
      '蛋白质每天80-90g',
      '多吃抗氧化食物：蓝莓、番茄',
      '继续补钙补铁',
      '适量健康脂肪：牛油果、橄榄油',
    ],
    recipes: [
      { meal: '早餐', name: '牛油果吐司+水煮蛋+牛奶', desc: '健康脂肪', thyroid: true },
      { meal: '午餐', name: '彩椒鸡丁+炒时蔬+米饭', desc: '维C丰富', thyroid: true },
      { meal: '晚餐', name: '鲫鱼豆腐汤+蒸南瓜+杂粮饭', desc: '滋补', thyroid: true },
    ],
    husbandTasks: [
      '了解大排畸检查的内容和意义',
      '陪妻子产检',
      '开始研究月子中心或月嫂',
    ],
    familyTasks: [
      '帮忙了解月嫂/月子中心',
      '保持家中环境干净整洁',
    ],
    shopping: [
      '婴儿安全座椅（可以开始研究了）',
      '婴儿衣物（少量即可）',
    ],
    thyroidNote: '孕中期过半，TSH目标<3.0。如果数值一直稳定，说明剂量合适，继续保持。',
  },

  20: {
    trimester: 2, stageName: '孕中期',
    summary: '大排畸B超！孕期最重要的检查之一',
    mustDo: [
      '大排畸B超（20-24周，系统筛查）',
      'TSH复查',
      '拍孕期纪念照',
      '预约糖耐量OGTT（24-28周）',
    ],
    mustNot: [
      '大排畸前不要过度紧张',
      'B超不需要空腹',
      '避免提重物',
    ],
    momChanges: [
      '肚子非常明显了',
      '可能开始出现腰背痛',
      '睡眠可能开始受影响',
      '精力仍然不错',
    ],
    babyChanges: [
      '大排畸可以看到宝宝详细结构',
      '开始有规律的活动-休息周期',
      '会吸吮手指',
      '约25-28cm，约300-400g',
    ],
    nutrition: [
      '孕中期营养需求高峰',
      '每天保证肉、蛋、奶、蔬菜、水果',
      '控制盐分摄入，预防水肿',
      '每周增重不超过0.5kg',
    ],
    recipes: [
      { meal: '早餐', name: '牛奶+全麦面包+煎蛋+水果沙拉', desc: '全面营养', thyroid: true },
      { meal: '午餐', name: '红烧牛肉+炒菠菜+米饭+番茄汤', desc: '高铁高蛋白', thyroid: true },
      { meal: '晚餐', name: '清蒸鱼+炒西兰花+南瓜粥', desc: 'DHA+钙', thyroid: true },
    ],
    husbandTasks: [
      '陪妻子做大排畸（可能能看到宝宝的脸！）',
      '拍孕期纪念照',
      '开始准备待产包清单',
    ],
    familyTasks: [
      '可以一起看B超照片',
      '帮助准备宝宝房间',
    ],
    shopping: [
      '婴儿床',
      '婴儿推车',
      '安全座椅',
    ],
    thyroidNote: '大排畸检查顺利通过后，TSH继续每4周监测。剂量稳定就继续保持。',
  },

  // 21-28周使用通用数据模板（后续可继续细化）
  21: {
    trimester: 2, stageName: '孕中期',
    summary: '宝宝活动增多，继续享受孕中期',
    mustDo: ['继续规律产检', 'TSH复查', '保持每天运动', '关注胎动规律'],
    mustNot: ['避免久坐', '避免高糖食物', '避免提重物'],
    momChanges: ['胎动越来越有力', '肚子持续变大', '可能出现水肿'],
    babyChanges: ['有睡眠和醒来周期', '能听到外界声音', '约27cm，约400g'],
    nutrition: ['蛋白质85g/天', '钙1000mg/天', '控制盐分预防水肿', '多喝水'],
    recipes: [
      { meal: '早餐', name: '牛奶+全麦面包+炒蛋+水果', desc: '均衡营养', thyroid: true },
      { meal: '午餐', name: '清蒸鱼+炒时蔬+米饭', desc: 'DHA+维生素', thyroid: true },
      { meal: '晚餐', name: '鸡肉蔬菜汤+杂粮饭', desc: '易消化', thyroid: true },
    ],
    husbandTasks: ['每天和宝宝互动', '关注妻子的身体变化', '帮忙做家务'],
    familyTasks: ['保持家中环境舒适', '帮忙准备营养餐'],
    shopping: ['婴儿湿巾、尿不湿（可以囤了）'],
    thyroidNote: 'TSH稳定<3.0，继续保持每4周监测。',
  },

  // 22-28周简化数据，保证每个阶段都有覆盖
  22: {
    trimester: 2, stageName: '孕中期', summary: '宝宝快速生长，补充足够营养',
    mustDo: ['TSH复查', '保持运动', '预约糖耐量'],
    mustNot: ['避免高糖食物', '避免熬夜'],
    momChanges: ['体重稳定增长', '可能出现妊娠纹'],
    babyChanges: ['约30cm，约500g', '开始有睫毛和眉毛'],
    nutrition: ['蛋白质85g/天', '铁27mg/天', '钙1000mg/天'],
    recipes: [
      { meal: '早餐', name: '燕麦牛奶+煮蛋+水果', desc: '营养早餐', thyroid: true },
      { meal: '午餐', name: '牛肉蔬菜炒饭+紫菜汤', desc: '高铁', thyroid: false },
      { meal: '晚餐', name: '清蒸鱼+炒青菜+杂粮饭', desc: '均衡', thyroid: true },
    ],
    husbandTasks: ['帮忙准备糖耐量检查', '陪妻子运动'],
    familyTasks: ['准备健康餐食'],
    shopping: ['孕妇枕（如果还没买）'],
    thyroidNote: 'TSH目标<3.0，继续监测。',
  },

  23: {
    trimester: 2, stageName: '孕中期', summary: '宝宝越来越活跃',
    mustDo: ['TSH复查', '记录胎动', '保持运动'],
    mustNot: ['避免长时间保持一个姿势', '避免提重物'],
    momChanges: ['胎动有力', '可能出现腰背痛'],
    babyChanges: ['约32cm，约600g', '开始有抓握反射'],
    nutrition: ['DHA 200mg/天', '多喝水', '控制盐分'],
    recipes: [
      { meal: '早餐', name: '豆浆+馒头+炒蛋+水果', desc: '植物蛋白', thyroid: false },
      { meal: '午餐', name: '虾仁豆腐+炒青菜+米饭', desc: '高钙', thyroid: false },
      { meal: '晚餐', name: '排骨汤+蒸南瓜+杂粮饭', desc: '滋补', thyroid: true },
    ],
    husbandTasks: ['帮忙按摩腰背', '一起准备宝宝用品'],
    familyTasks: ['帮忙做家务', '保持家中整洁'],
    shopping: ['婴儿衣物（NB码和0-3月各几件）'],
    thyroidNote: '继续每月查TSH，保持<3.0。',
  },

  24: {
    trimester: 2, stageName: '孕中期', summary: '糖耐量检查周！',
    mustDo: ['糖耐量OGTT检查（24-28周）', 'TSH复查', '大排畸（如果还没做）'],
    mustNot: ['糖耐量前按医嘱空腹', '避免紧张'],
    momChanges: ['体重明显增加', '可能出现水肿'],
    babyChanges: ['约33cm，约750g', '肺开始发育', '可以睁眼'],
    nutrition: ['糖耐量前正常饮食，不要刻意改变', '检查后根据结果调整饮食'],
    recipes: [
      { meal: '早餐', name: '全麦面包+牛奶+煮蛋', desc: '低GI', thyroid: true },
      { meal: '午餐', name: '鸡胸肉沙拉+糙米饭', desc: '低糖高蛋白', thyroid: true },
      { meal: '晚餐', name: '清蒸鱼+炒时蔬+杂粮饭', desc: '均衡', thyroid: true },
    ],
    husbandTasks: ['陪妻子做糖耐量（需要等2-3小时）', '带点吃的，检查完给妻子'],
    familyTasks: ['检查完后准备营养餐'],
    shopping: ['血糖仪（如果糖耐量异常）'],
    thyroidNote: '糖耐量和TSH可以同一天抽血，减少扎针次数。',
  },

  25: {
    trimester: 2, stageName: '孕中期', summary: '孕中期最后阶段，准备进入孕晚期',
    mustDo: ['TSH复查', '开始数胎动（28周后正式开始）', '了解孕晚期注意事项'],
    mustNot: ['避免高糖高脂食物', '避免过度劳累'],
    momChanges: ['肚子很大了', '可能出现烧心/胃灼热'],
    babyChanges: ['约35cm，约900g', '大脑快速发育'],
    nutrition: ['少食多餐防烧心', '避免辛辣刺激', '蛋白质90g/天'],
    recipes: [
      { meal: '早餐', name: '牛奶+麦片+香蕉', desc: '温和不刺激', thyroid: true },
      { meal: '午餐', name: '蒸鱼+蒸蔬菜+米饭', desc: '清淡', thyroid: true },
      { meal: '晚餐', name: '小米南瓜粥+炒蛋+蒸蔬菜', desc: '易消化', thyroid: true },
    ],
    husbandTasks: ['了解孕晚期注意事项', '开始准备待产包'],
    familyTasks: ['做清淡餐食', '帮助准备待产物品'],
    shopping: ['待产包物品开始采购'],
    thyroidNote: '即将进入孕晚期，TSH目标保持<3.0。',
  },

  26: {
    trimester: 2, stageName: '孕中期', summary: '准备进入孕晚期',
    mustDo: ['TSH复查', '了解临产征兆', '继续运动'],
    mustNot: ['避免长时间坐车', '避免穿高跟鞋'],
    momChanges: ['行动开始不便', '睡眠质量可能下降'],
    babyChanges: ['约37cm，约1000g', '眼睛可以睁开'],
    nutrition: ['蛋白质90g/天', '钙1200mg/天', '少食多餐'],
    recipes: [
      { meal: '早餐', name: '牛奶+面包+鸡蛋+水果', desc: '均衡', thyroid: true },
      { meal: '午餐', name: '鸡肉+蔬菜+米饭', desc: '高蛋白', thyroid: true },
      { meal: '晚餐', name: '鱼汤+蔬菜+杂粮饭', desc: '易消化', thyroid: true },
    ],
    husbandTasks: ['开始学习分娩知识', '确认医院路线'],
    familyTasks: ['帮忙准备待产包'],
    shopping: ['产妇卫生巾', '一次性内裤', '哺乳内衣'],
    thyroidNote: 'TSH继续监测，目标<3.0。',
  },

  27: {
    trimester: 2, stageName: '孕中期', summary: '孕中期最后一周',
    mustDo: ['TSH复查', '完成待产包清单', '确认分娩医院'],
    mustNot: ['避免过度疲劳', '避免长途旅行'],
    momChanges: ['行动越来越不方便', '可能出现假性宫缩'],
    babyChanges: ['约38cm，约1100g', '有规律作息'],
    nutrition: ['均衡饮食', '多喝水', '控制体重增速'],
    recipes: [
      { meal: '早餐', name: '牛奶+全麦面包+煎蛋', desc: '简单营养', thyroid: true },
      { meal: '午餐', name: '清蒸鱼+炒蔬菜+米饭', desc: '均衡', thyroid: true },
      { meal: '晚餐', name: '蔬菜汤+蒸蛋+杂粮饭', desc: '清淡', thyroid: true },
    ],
    husbandTasks: ['整理待产包', '确认医院入院流程'],
    familyTasks: ['帮忙收拾待产包'],
    shopping: ['待产包收纳箱'],
    thyroidNote: '孕中期结束，TSH继续保持<3.0。产后优甲乐剂量需要回调，提前了解。',
  },

  // ==================== 孕晚期 28-40周 ====================
  28: {
    trimester: 3, stageName: '孕晚期',
    summary: '进入孕晚期！开始数胎动，这是最重要的日常监测',
    mustDo: [
      '开始每天数胎动（非常重要！）',
      'TSH复查',
      '每2周一次产检',
      '完成待产包准备',
    ],
    mustNot: [
      '如果胎动明显减少，立即就医（不要等！）',
      '避免仰卧（左侧卧最佳）',
      '避免长时间站立',
    ],
    momChanges: [
      '进入孕晚期，行动不便',
      '胃灼热、便秘可能加重',
      '睡眠质量下降',
      '可能出现水肿',
    ],
    babyChanges: [
      '眼睛可以睁开和闭上',
      '大脑快速发育',
      '有规律作息',
      '约40cm，约1300g',
    ],
    nutrition: [
      '少食多餐（5-6顿/天）',
      '蛋白质90-100g/天',
      '钙1200mg/天',
      '控制盐分，预防水肿',
    ],
    recipes: [
      { meal: '早餐', name: '牛奶+全麦面包+炒蛋+水果', desc: '均衡', thyroid: true },
      { meal: '午餐', name: '鲫鱼豆腐汤+炒时蔬+米饭', desc: '补钙', thyroid: false },
      { meal: '晚餐', name: '小米南瓜粥+蒸鱼+凉拌黄瓜', desc: '易消化', thyroid: true },
    ],
    husbandTasks: [
      '学习数胎动方法，帮忙记录',
      '完成待产包，放在固定位置',
      '确认医院路线和入院流程',
    ],
    familyTasks: [
      '帮忙准备待产包',
      '了解临产征兆',
    ],
    shopping: [
      '新生儿衣物（清洗消毒）',
      '婴儿洗浴用品',
      '纸尿裤NB码',
    ],
    thyroidNote: '孕晚期TSH目标<3.0 mIU/L。继续每2-4周监测。产后优甲乐剂量需要减回孕前水平，提前和医生确认。',
  },

  29: {
    trimester: 3, stageName: '孕晚期', summary: '坚持数胎动，准备分娩',
    mustDo: ['每天数胎动', 'TSH复查', '继续产检（每2周）', '学习分娩呼吸法'],
    mustNot: ['避免忽略胎动异常', '避免过度劳累'],
    momChanges: ['肚子很大', '行动不便', '睡眠困难'],
    babyChanges: ['约42cm，约1600g', '骨骼钙化', '头部可能转向下方'],
    nutrition: ['蛋白质90g/天', '少食多餐', '睡前少喝水'],
    recipes: [
      { meal: '早餐', name: '牛奶+燕麦+水果', desc: '温和', thyroid: true },
      { meal: '午餐', name: '虾仁豆腐蒸蛋+蔬菜+米饭', desc: '高蛋白', thyroid: false },
      { meal: '晚餐', name: '小米粥+蒸鱼+时蔬', desc: '易消化', thyroid: true },
    ],
    husbandTasks: ['一起学习分娩呼吸法', '帮妻子按摩缓解不适'],
    familyTasks: ['准备营养餐', '保持家中环境安静舒适'],
    shopping: ['婴儿浴盆', '婴儿沐浴露'],
    thyroidNote: 'TSH目标<3.0。产后优甲乐要减量！提前和医生确认产后剂量。',
  },

  30: {
    trimester: 3, stageName: '孕晚期', summary: '继续监测，准备分娩计划',
    mustDo: ['每天数胎动', 'TSH复查', '和医生讨论分娩计划'],
    mustNot: ['避免长途旅行', '避免重体力活'],
    momChanges: ['肚子非常大了', '可能开始有Braxton Hicks宫缩'],
    babyChanges: ['约44cm，约1800g', '皮下脂肪增加'],
    nutrition: ['均衡饮食', '控制体重', '多喝水'],
    recipes: [
      { meal: '早餐', name: '牛奶+面包+鸡蛋', desc: '简单营养', thyroid: true },
      { meal: '午餐', name: '鸡肉蔬菜汤+米饭', desc: '高蛋白', thyroid: true },
      { meal: '晚餐', name: '南瓜粥+蒸鱼+蔬菜', desc: '易消化', thyroid: true },
    ],
    husbandTasks: ['和妻子一起制定分娩计划', '准备入院证件'],
    familyTasks: ['了解分娩计划', '保持家中整洁'],
    shopping: ['产妇护理垫', '哺乳枕'],
    thyroidNote: 'TSH继续监测，保持<3.0。',
  },

  31: {
    trimester: 3, stageName: '孕晚期', summary: '孕晚期中段，继续坚持',
    mustDo: ['每天数胎动', 'TSH复查', '继续产检'],
    mustNot: ['避免忽视身体信号', '避免独自出远门'],
    momChanges: ['越来越累', '水肿可能加重'],
    babyChanges: ['约45cm，约2000g', '五种感官都已发育'],
    nutrition: ['少食多餐', '蛋白质90g/天', '控制盐分'],
    recipes: [
      { meal: '早餐', name: '牛奶+全麦面包+水果', desc: '均衡', thyroid: true },
      { meal: '午餐', name: '清蒸鱼+蔬菜+米饭', desc: 'DHA', thyroid: true },
      { meal: '晚餐', name: '蔬菜瘦肉粥+蒸蛋', desc: '易消化', thyroid: true },
    ],
    husbandTasks: ['多陪伴妻子', '完成工作交接准备'],
    familyTasks: ['帮忙做家务', '准备营养餐'],
    shopping: ['新生儿奶瓶（备用）', '奶粉小罐装（备用）'],
    thyroidNote: '继续监测TSH。',
  },

  32: {
    trimester: 3, stageName: '孕晚期', summary: '胎动监测关键期，准备待产',
    mustDo: ['每天数胎动（非常重要）', 'TSH复查', '产检（32周起可能增加频率）'],
    mustNot: ['胎动异常必须立即就医', '避免一个人在家太久'],
    momChanges: ['子宫压迫膈肌，可能呼吸不畅', '尿频加重'],
    babyChanges: ['约47cm，约2200g', '头部通常已转向下方'],
    nutrition: ['蛋白质90g/天', '少食多餐', '避免睡前吃太多'],
    recipes: [
      { meal: '早餐', name: '牛奶+燕麦+水果+坚果', desc: '营养丰富', thyroid: true },
      { meal: '午餐', name: '牛肉炖土豆+蔬菜+米饭', desc: '高铁', thyroid: true },
      { meal: '晚餐', name: '鲫鱼汤+蒸蔬菜+杂粮饭', desc: '滋补', thyroid: true },
    ],
    husbandTasks: ['确认所有待产物品齐全', '了解入院流程'],
    familyTasks: ['准备好紧急联系方式', '保持手机畅通'],
    shopping: ['婴儿洗衣液', '婴儿指甲剪'],
    thyroidNote: 'TSH目标<3.0。和医生确认产后优甲乐剂量（通常减回孕前剂量）。',
  },

  33: {
    trimester: 3, stageName: '孕晚期', summary: '孕晚期冲刺阶段',
    mustDo: ['每天数胎动', 'TSH复查', '每周产检（根据医生建议）'],
    mustNot: ['避免忽略任何不适', '避免长时间无人陪伴'],
    momChanges: ['行动非常不便', '睡眠困难', '焦虑可能增加'],
    babyChanges: ['约48cm，约2500g', '免疫系统完善'],
    nutrition: ['蛋白质90-100g/天', '继续少食多餐'],
    recipes: [
      { meal: '早餐', name: '牛奶+鸡蛋+面包+水果', desc: '全面营养', thyroid: true },
      { meal: '午餐', name: '鱼肉+蔬菜+米饭', desc: '高蛋白', thyroid: true },
      { meal: '晚餐', name: '小米粥+蒸蛋+蔬菜', desc: '易消化', thyroid: true },
    ],
    husbandTasks: ['随时准备入院', '保持冷静，给妻子安全感'],
    familyTasks: ['保持家中环境整洁安静', '随时待命'],
    shopping: ['确认待产包完整'],
    thyroidNote: '最后阶段，TSH继续保持<3.0。',
  },

  34: {
    trimester: 3, stageName: '孕晚期', summary: '宝宝肺部接近成熟',
    mustDo: ['每天数胎动', 'TSH复查', '确认待产包'],
    mustNot: ['避免独自外出', '避免忽略任何不适'],
    momChanges: ['可能感觉宝宝在"下降"（入盆）', '呼吸可能变顺畅'],
    babyChanges: ['约49cm，约2700g', '肺部接近成熟'],
    nutrition: ['保持均衡饮食', '多休息'],
    recipes: [
      { meal: '早餐', name: '牛奶+面包+鸡蛋+水果', desc: '均衡', thyroid: true },
      { meal: '午餐', name: '鸡肉+蔬菜+米饭', desc: '高蛋白', thyroid: true },
      { meal: '晚餐', name: '粥+蒸鱼+蔬菜', desc: '易消化', thyroid: true },
    ],
    husbandTasks: ['准备好所有入院物品', '熟记医院路线'],
    familyTasks: ['做好入院准备', '保持联系畅通'],
    shopping: ['（待产包应该已齐）'],
    thyroidNote: 'TSH继续保持<3.0。产后第2天就要复查TSH，调整优甲乐剂量。',
  },

  35: {
    trimester: 3, stageName: '孕晚期', summary: '宝宝基本成熟，随时可能出生',
    mustDo: ['每天数胎动', 'TSH复查', '每周产检'],
    mustNot: ['避免长途出行', '避免一个人在家'],
    momChanges: ['宝宝可能入盆', '假性宫缩增多'],
    babyChanges: ['约50cm，约2900g', '基本发育成熟'],
    nutrition: ['保持体力', '均衡饮食'],
    recipes: [
      { meal: '早餐', name: '牛奶+全麦面包+鸡蛋+水果', desc: '保持体力', thyroid: true },
      { meal: '午餐', name: '牛肉+蔬菜+米饭', desc: '高铁高蛋白', thyroid: true },
      { meal: '晚餐', name: '鱼汤+蒸蔬菜+杂粮饭', desc: '营养', thyroid: true },
    ],
    husbandTasks: ['随时准备出发去医院', '保持冷静'],
    familyTasks: ['做好后勤保障'],
    shopping: ['（全部齐备）'],
    thyroidNote: '产后优甲乐减量！一般恢复到孕前剂量。产后第2天查TSH。',
  },

  36: {
    trimester: 3, stageName: '孕晚期', summary: '足月了！宝宝随时可能出生',
    mustDo: ['每天数胎动', 'TSH复查', '每周产检', '了解临产三大征兆'],
    mustNot: ['避免焦虑', '避免独自一人在家'],
    momChanges: ['宝宝可能已入盆', '临产征兆：见红、破水、规律宫缩'],
    babyChanges: ['约51cm，约3100g', '已足月！随时准备出生'],
    nutrition: ['保持体力', '吃易消化食物'],
    recipes: [
      { meal: '早餐', name: '牛奶+面包+鸡蛋', desc: '简单有营养', thyroid: true },
      { meal: '午餐', name: '鸡肉粥+蒸蔬菜', desc: '易消化', thyroid: true },
      { meal: '晚餐', name: '小米粥+蒸蛋+蔬菜', desc: '温和', thyroid: true },
    ],
    husbandTasks: ['复习临产三大征兆', '手机24小时开机', '准备好去医院'],
    familyTasks: ['随时待命', '保持冷静'],
    shopping: ['（全部齐备）'],
    thyroidNote: '恭喜！宝宝已足月。产后务必第2天查TSH，调整优甲乐。产后通常恢复到孕前剂量。',
  },
};

// 37-40周复用36周数据模板
for (var w = 37; w <= 40; w++) {
  weekData[w] = JSON.parse(JSON.stringify(weekData[36]));
  weekData[w].summary = '第' + w + '周：宝宝已足月，随时可能见面！注意临产征兆。';
  weekData[w].babyChanges = ['约51-52cm，约3200-3600g', '已足月！随时准备出生', '注意临产征兆'];
}

// 导出
module.exports = { weekData: weekData };
