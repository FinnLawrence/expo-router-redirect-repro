import { type Href, Link } from "expo-router"
import { Text, View } from "react-native"

export default function Index() {
  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text>The link below goes to /old/abc, which app.json redirects to /new/abc.</Text>
      <Link href={"/old/abc" as Href}>Go to /old/abc</Link>
    </View>
  )
}
