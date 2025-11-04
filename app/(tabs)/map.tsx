import {StyleSheet} from 'react-native'
import {fetchLocation, Location} from "@/services/api/mapApi"

export default function MapScreen() {
  return (
    <>
    </>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
