/** @format */

import React, {useCallback, useContext, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RangeSlider from 'rn-range-slider';
import Label from '../../components/Label';
import Rail from '../../components/Rail';
import RailSelected from '../../components/RailSelected';
import Thumb from '../../components/Thumb';

import {PropertyContext} from '../../Context';

import debounce from '../../helpers/debounce';

import {ArrowRight} from '../../icons';

const Result = ({navigation}) => {
  const {
    loading,
    results,
    setKeyword,
    setMinPrice,
    setMaxPrice,
    maxPrice,
    minPrice,
  } = useContext(PropertyContext);

  const [isRangeChange, setIsRangeChange] = useState(false);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const handleHiddenOverflowY = useCallback(() => {
    setIsRangeChange(true);
  });
  const handleRangeChange = useCallback((low, high) => {
    setMinPrice(low);
    setMaxPrice(high);
    setIsRangeChange(false);
  }, []);

  const handleRenderResultName = () => {
    if (results.length > 0) {
      return results.map(result => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                itemId: result._id,
              })
            }
            key={result._id}
            style={styles.item}>
            <View>
              <Text style={styles.name}>{result.name}</Text>
              <View style={styles.details}>
                <Text style={styles.address}>
                  {result.address}, {result.district}, {result.city}
                </Text>
                <Text>${result.price}</Text>
              </View>
            </View>
            <View style={styles.arrow}>
              <ArrowRight />
            </View>
          </TouchableOpacity>
        );
      });
    } else {
      return <Text>Nothing has been found</Text>;
    }
  };

  const handleEnterKeyword = debounce(text => {
    setKeyword(text);
  }, 500);

  return (
    <ScrollView style={styles.container} scrollEnabled={!isRangeChange}>
      <TextInput
        onChangeText={handleEnterKeyword}
        style={styles.searchInput}
        placeholder="Search"
      />
      <View style={styles.range}>
        <Text style={styles.rangeLabel}>Range of price ($)</Text>
        <RangeSlider
          min={0}
          max={10000}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderLabel={renderLabel}
          renderRailSelected={renderRailSelected}
          onTouchStart={handleHiddenOverflowY}
          onTouchEnd={handleRangeChange}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>{minPrice}</Text>
          <Text>{maxPrice}</Text>
        </View>
      </View>
      {loading ? <Text>Loading...</Text> : handleRenderResultName()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  searchInput: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 6,
    paddingVertical: 16,
  },
  range: {
    marginVertical: 8,
  },
  rangeLabel: {
    marginBottom: 6,
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    lineHeight: 32,
  },
  details: {
    marginTop: 8,
  },
  address: {
    fontSize: 16,
    color: '#919191',
    marginBottom: 4,
  },
  arrow: {
    width: 24,
    height: 24,
  },
});

export default Result;
