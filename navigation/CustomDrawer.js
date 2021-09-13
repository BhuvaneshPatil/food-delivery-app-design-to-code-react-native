import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
	COLORS,
	constants,
	dummyData,
	FONTS,
	icons,
	images,
	SIZES,
} from "../constants";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	useDrawerProgress,
} from "@react-navigation/drawer";
import { MainLayout } from "../screens";
import Animated from "react-native-reanimated";
const Drawer = createDrawerNavigator();
const CustomDrawerItem = ({ label, icon }) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				height: 40,
				marginBottom: SIZES.base,
				alignItems: "center",
				paddingLeft: SIZES.radius,
				borderRadius: SIZES.base,
				// background color
			}}
			// onPress
		>
			<Image
				source={icon}
				style={{ tintColor: COLORS.white, height: 20, width: 20 }}
			/>
			<Text style={{ marginLeft: 15, ...FONTS.h3, color: COLORS.white }}>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

const DrawerContent = ({ navigation }) => {
	const prog = useDrawerProgress();
	return (
		<DrawerContentScrollView
			scrollEnabled={true}
			contentContainerStyle={{
				flex: 1,
			}}
		>
			<View style={{ flex: 1, paddingHorizontal: SIZES.radius }}>
				{/* close */}
				<View
					style={{
						alignItems: "flex-start",
						justifyContent: "center",
					}}
				>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
						}}
						onPress={() => navigation.closeDrawer()}
					>
						<Image
							source={icons.cross}
							style={{
								height: 35,
								width: 35,
								tintColor: COLORS.white,
							}}
						/>
					</TouchableOpacity>
				</View>
				{/* Profile */}
				<TouchableOpacity
					onPress={() => console.log("Profile")}
					style={{
						flexDirection: "row",
						marginTop: SIZES.radius,
						alignItems: "center",
					}}
				>
					<Image
						source={images.profile}
						style={{
							height: 50,
							width: 50,
							borderRadius: SIZES.radius,
						}}
					/>
					<View style={{ marginLeft: SIZES.radius }}>
						<Text style={{ color: COLORS.white, ...FONTS.h3 }}>
							{dummyData.myProfile.name}
						</Text>
						<Text
							style={{
								color: COLORS.white,
								...FONTS.body4,
								opacity: 0.8,
							}}
						>
							View Your Profile
						</Text>
					</View>
				</TouchableOpacity>
				{/* Drawer Items */}
				<View style={{ flex: 1, marginTop: SIZES.padding }}>
					<CustomDrawerItem
						label={constants.screens.home}
						icon={icons.home}
					/>
					<CustomDrawerItem
						label={constants.screens.my_wallet}
						icon={icons.wallet}
					/>
					<CustomDrawerItem
						label={constants.screens.notification}
						icon={icons.notification}
					/>
					<CustomDrawerItem
						label={constants.screens.favourite}
						icon={icons.favourite}
					/>
					{/* Line Divider */}
					<View
						style={{
							height: 1,
							marginVertical: SIZES.radius,
							marginLeft: SIZES.radius,
							backgroundColor: COLORS.lightGray1,
							opacity: 0.5,
						}}
					/>
					<CustomDrawerItem
						label="Track your orders"
						icon={icons.location}
					/>
					<CustomDrawerItem label="Coupons" icon={icons.coupon} />
					<CustomDrawerItem label="Settings" icon={icons.setting} />
					<CustomDrawerItem
						label="Invite A Friend"
						icon={icons.profile}
					/>
					<CustomDrawerItem label="Help Center" icon={icons.help} />
				</View>
				<View style={{ marginBottom: SIZES.padding }}>
					<CustomDrawerItem label="Logout" icon={icons.logout} />
				</View>
			</View>
		</DrawerContentScrollView>
	);
};
const CustomDrawer = () => {
	const [progress, setProgress] = React.useState(new Animated.Value(0));

	const scale = Animated.interpolateNode(progress, {
		inputRange: [0, 1],
		outputRange: [1, 0.8],
	});
	const borderRadius = Animated.interpolateNode(progress, {
		inputRange: [0, 1],
		outputRange: [0, 26],
	});
	const animatedStyle = { borderRadius };
	return (
		<View style={{ flex: 1, backgroundColor: COLORS.primary }}>
			<Drawer.Navigator
				screenOptions={{
					headerShown: false,
					drawerType: "slide",
					overlayColor: "transparent",
					drawerStyle: {
						flex: 1,
						width: "60%",
						paddingRight: 20,
						backgroundColor: "transparent",
					},
					sceneContainerStyle: {
						backgroundColor: "transparent",
					},
				}}
				initialRouteName="MainLayout"
				drawerContent={(props) => {
					console.log(props.progress);
					setTimeout(() => {
						setProgress(props.progress);
					}, 0);
					return <DrawerContent navigation={props.navigation} />;
				}}
			>
				<Drawer.Screen name="MainLayout">
					{(props) => (
						<MainLayout
							{...props}
							drawerAnimatedStyle={animatedStyle}
						/>
					)}
				</Drawer.Screen>
			</Drawer.Navigator>
		</View>
	);
};
export default CustomDrawer;
