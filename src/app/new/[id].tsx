import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function NewPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <View style={{ padding: 24 }}>
      <Text>New page for id: {id}</Text>
    </View>
  )
}
