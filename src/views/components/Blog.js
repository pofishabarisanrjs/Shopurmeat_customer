import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { baseUrl, domainUrl } from '../../constants/Constants';
import { ScrollView } from 'react-native-gesture-handler';

export default function Trending() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const abortController = new AbortController();

  useEffect(() => {
    fetch(`${baseUrl}/promo-slider`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result.mainSlides);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const images = data?.map((item) => ({
    image: `${domainUrl}${item.data.image}`,
  }));

  return (
    isLoading ? (
      <View>
        <SkeletonPlaceholder>
          <View style={{ width: '100%', height: 200 }}></View>
        </SkeletonPlaceholder>
      </View>
    ) : (
      <ScrollView style={styles.categorie}>
        <FlatListSlider
          data={images}
          width={450}
          height={200}
          timer={5000}
          resizeMode={'contain'}
          onPress={item => console.log('pressed')}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          indicatorActiveColor={'orange'}
          indicatorInActiveColor={'#ffffff'}
          indicator={true}
          indicatorActiveWidth={24}
          animation
        />
      </ScrollView>
    )
  );
}

const styles = StyleSheet.create({
  categorie: {
    width: '100%',
    right: 8,
  },
});
