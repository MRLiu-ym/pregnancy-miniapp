import { View, Text, Input, Picker, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './profile.scss';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '', age: 25, heightCm: 165, prePregnancyWeightKg: 56,
    bloodType: '未知', lastMenstrualPeriod: '2025-05-30',
    pregnancyCount: 1, birthCount: 0,
    hasThyroidCondition: true, thyroidMedication: '优甲乐', thyroidDosageMcg: 137.5,
    tshTargetEarly: 2.5, tshTargetMid: 3.0, tshTargetLate: 3.0,
  });

  const [healthForm, setHealthForm] = useState({ type: 'weight', value: '', date: new Date().toISOString().split('T')[0], notes: '' });
  const [records, setRecords] = useState([]);

  useLoad(() => {
    const data = Taro.getStorageSync('profile');
    if (data) {
      setProfile(data);
      setForm({ ...form, ...data });
    }
    const recs = Taro.getStorageSync('healthRecords') || [];
    setRecords(recs);
  });

  const save = () => {
    const due = new Date(new Date(form.lastMenstrualPeriod).getTime() + 280 * 86400000).toISOString().split('T')[0];
    const p = { ...form, estimatedDueDate: due };
    Taro.setStorageSync('profile', p);
    setProfile(p);
    setEditing(false);
    Taro.showToast({ title: '保存成功', icon: 'success' });
  };

  const addHealth = () => {
    if (!healthForm.value) return;
    const recs = Taro.getStorageSync('healthRecords') || [];
    recs.push({ id: Date.now(), type: healthForm.type, value: parseFloat(healthForm.value), date: healthForm.date, notes: healthForm.notes });
    Taro.setStorageSync('healthRecords', recs);
    setRecords(recs);
    setHealthForm({ ...healthForm, value: '', notes: '' });
    Taro.showToast({ title: '已记录', icon: 'success' });
  };

  return (
    <View className="page">
      <View className="tabs">
        {['基本信息', '健康数据', '产检记录'].map((t, i) => (
          <View key={i} className={`tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>
            <Text>{t}</Text>
          </View>
        ))}
      </View>

      {tab === 0 && (
        <View>
          {!editing && profile ? (
            <View>
              <View className="card">
                <View className="card-title-row"><Text>基本信息</Text></View>
                <Row label="年龄" value={`${profile.age}岁`} />
                <Row label="身高" value={`${profile.heightCm}cm`} />
                <Row label="孕前体重" value={`${profile.prePregnancyWeightKg}kg`} />
                <Row label="血型" value={profile.bloodType} />
                <Row label="末次月经" value={profile.lastMenstrualPeriod} />
                <Row label="预产期" value={profile.estimatedDueDate || '--'} />
              </View>
              <View className="card">
                <View className="card-title-row"><Text>甲减管理</Text></View>
                <Row label="用药" value={`${profile.thyroidMedication} ${profile.thyroidDosageMcg}μg/天`} hl />
                <Row label="TSH目标(早)" value={`< ${profile.tshTargetEarly}`} />
                <Row label="TSH目标(中)" value={`< ${profile.tshTargetMid}`} />
                <Row label="TSH目标(晚)" value={`< ${profile.tshTargetLate}`} />
              </View>
              <View className="btn" onClick={() => setEditing(true)}><Text>编辑档案</Text></View>
            </View>
          ) : (
            <View>
              <View className="card">
                <Field label="姓名" value={form.name} onChange={v => setForm({...form, name: v})} />
                <Field label="年龄" value={String(form.age)} onChange={v => setForm({...form, age: parseInt(v)||0})} type="number" />
                <Field label="身高(cm)" value={String(form.heightCm)} onChange={v => setForm({...form, heightCm: parseFloat(v)||0})} type="digit" />
                <Field label="孕前体重(kg)" value={String(form.prePregnancyWeightKg)} onChange={v => setForm({...form, prePregnancyWeightKg: parseFloat(v)||0})} type="digit" />
                <Field label="末次月经" value={form.lastMenstrualPeriod} onChange={v => setForm({...form, lastMenstrualPeriod: v})} type="date" />
                <Field label="药品" value={form.thyroidMedication} onChange={v => setForm({...form, thyroidMedication: v})} />
                <Field label="剂量(μg/天)" value={String(form.thyroidDosageMcg)} onChange={v => setForm({...form, thyroidDosageMcg: parseFloat(v)||0})} type="digit" />
                <Field label="TSH目标-早" value={String(form.tshTargetEarly)} onChange={v => setForm({...form, tshTargetEarly: parseFloat(v)||2.5})} type="digit" />
                <Field label="TSH目标-中" value={String(form.tshTargetMid)} onChange={v => setForm({...form, tshTargetMid: parseFloat(v)||3.0})} type="digit" />
                <Field label="TSH目标-晚" value={String(form.tshTargetLate)} onChange={v => setForm({...form, tshTargetLate: parseFloat(v)||3.0})} type="digit" />
              </View>
              <View style={{display:'flex',gap:'16px'}}>
                <View className="btn-cancel" onClick={() => setEditing(false)}><Text>取消</Text></View>
                <View className="btn" style={{flex:1}} onClick={save}><Text>保存</Text></View>
              </View>
            </View>
          )}
        </View>
      )}

      {tab === 1 && (
        <View>
          <View className="card">
            <View className="card-title-row"><Text>记录健康数据</Text></View>
            <View className="type-btns">
              {['weight:体重', 'tsh:TSH', 'bp:血压'].map(t => (
                <View key={t} className={`type-btn ${healthForm.type === t.split(':')[0] ? 'active' : ''}`}
                  onClick={() => setHealthForm({...healthForm, type: t.split(':')[0]})}>
                  <Text>{t.split(':')[1]}</Text>
                </View>
              ))}
            </View>
            <Input className="input" type="digit" placeholder="输入数值" value={healthForm.value}
              onInput={e => setHealthForm({...healthForm, value: e.detail.value})} />
            <Input className="input" type="date" value={healthForm.date}
              onInput={e => setHealthForm({...healthForm, date: e.detail.value})} />
            <Input className="input" placeholder="备注(可选)" value={healthForm.notes}
              onInput={e => setHealthForm({...healthForm, notes: e.detail.value})} />
            <View className="btn" onClick={addHealth}><Text>添加记录</Text></View>
          </View>
          {records.length > 0 && (
            <View className="card">
              <View className="card-title-row"><Text>最近记录</Text></View>
              {records.slice(-8).reverse().map((r) => (
                <View key={r.id} className="record-row">
                  <Text className="record-date">{r.date}</Text>
                  <Text className="record-val">{r.type === 'weight' ? `${r.value}kg` : r.type === 'tsh' ? `${r.value} mIU/L` : `${r.value}`}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {tab === 2 && (
        <View className="card">
          <View className="card-title-row"><Text>产检时间线</Text></View>
          {[
            { w: '6-8周', n: '首次B超', d: '确认宫内妊娠、胎心' },
            { w: '11-13周', n: 'NT检查', d: '早期排畸筛查' },
            { w: '15-20周', n: '唐筛/无创DNA', d: '染色体异常筛查' },
            { w: '20-24周', n: '大排畸', d: '系统超声筛查' },
            { w: '24-28周', n: '糖耐量', d: '妊娠期糖尿病筛查' },
          ].map((item, i) => (
            <View key={i} className="checkup-item">
              <View className="dot" />
              <View>
                <Text className="checkup-name">{item.n}</Text>
                <Text className="checkup-info">{item.w} · {item.d}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function Row({ label, value, hl }) {
  return (
    <View className="row">
      <Text className="row-label">{label}</Text>
      <Text className={`row-value ${hl ? 'hl' : ''}`}>{value}</Text>
    </View>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <View className="field">
      <Text className="field-label">{label}</Text>
      <View className="input-wrap">
        <Input className="input-field" type={type} value={value} onInput={e => onChange(e.detail.value)} />
      </View>
    </View>
  );
}
