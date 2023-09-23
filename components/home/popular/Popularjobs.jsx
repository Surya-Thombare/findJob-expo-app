import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
// const rapidApiKey = NODE_ENV['RAPID_API_KEY'];




import useFetch from "../../../hook/useFetch";
import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common//cards/popular/PopularJobCard";

const Popularjobs = () => {
  const [selectedJob, setSelectedJob] = useState();

  const router = new useRouter();

  const {isLoading, data, error} = useFetch(
    'search', {
      query: 'React develper',
      num_pages: 1
    }
  )

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            colors={COLORS.primary}
          />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
            <PopularJobCard 
              item={item} 
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
