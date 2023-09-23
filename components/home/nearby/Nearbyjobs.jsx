import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
// const rapidApiKey = NODE_ENV['RAPID_API_KEY'];

import useFetch from "../../../hook/useFetch";
import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common//cards/nearby/NearbyJobCard";

const NearbyJobs = () => {
  const router = new useRouter();

  const {isLoading, data, error} = useFetch(
    'search', {
      query: 'React develper',
      num_pages: 1
    }
  )


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NearBy jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard 
              job={job}
              key={`nearby_job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
