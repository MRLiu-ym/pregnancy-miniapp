import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './charts.scss';

export default function Charts() {
  const [records, setRecords] = useState([]);
  const [profile, setProfile] = useState(null);

  useLoad(() => {
    setRecords(Taro.getStorageSync('healthRecords') || []);
    setProfile(Taro.getStorageSync('profile'));
  });

  const weightRecs = records.filter((r) => r.type === 'weight').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const tshRecs = records.filter((r) => r.type === 'tsh').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <View className="page">
      <View className="card">
        <View className="card-title"><Text>⚖️ 体重记录</Text></View>
        {weightRecs.length > 0 ? (
          <View className="chart-simple">
            {weightRecs.map((r, i) => (
              <View key={i} className="bar-wrap">
                <View className="bar" style={{height: `${Math.max(20, (r.value - (profile?.prePregnancyWeightKg || 50)) * 40 + 40)}px`}} />
                <Text className="bar-date">{r.date.slice(5)}</Text>
                <Text className="bar-val">{r.value}kg</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="no-data">暂无体重数据</Text>
        )}
      </View>

      <View className="card">
        <View className="card-title"><Text>🧪 TSH 记录</Text></View>
        {tshRecs.length > 0 ? (
          <View className="list">
            {tshRecs.slice(-6).reverse().map((r) => (
              <View key={r.id} className="list-row">
                <Text className="list-date">{r.date}</Text>
                <Text className={`list-val ${r.value > 2.5 ? 'high' : 'ok'}`}>{r.value} mIU/L</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="no-data">暂无TSH数据</Text>
        )}
      </View>

      <View className="stats">
        <View className="stat-card">
          <Text className="stat-label">体重记录</Text>
          <Text className="stat-num">{weightRecs.length}次</Text>
        </View>
        <View className="stat-card">
          <Text className="stat-label">TSH记录</Text>
          <Text className="stat-num">{tshRecs.length}次</Text>
        </View>
      </View>
    </View>
  );
}
