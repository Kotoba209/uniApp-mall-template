<template>
	<view>
		<swiper class="carousel" indicator-dots=true circular=true interval="3000" duration="700">
			<swiper-item v-for="(item,index) in data.imgList" :key="index">
				<view class="image-wrapper">
					<image
						:src="item.src" 
						:class="item.loaded" 
						mode="aspectFill"
						@load="imageOnLoad('imgList', index)" 
					></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="scroll-view-wrapper">
			<scroll-view class="episode-panel" :class="{Skeleton:!loaded}" scroll-x>
				<view v-for="(item, index) in data.episodeList" :key="index"
					:class="{current: currentEpd===item}"
					@click="changeEpd(index)"
				>
					{{item}}
				</view>
			</scroll-view>
		</view>
		<view class="info">
			<view class="title">
				<text :class="{Skeleton:!loaded}">{{data.title}}</text>
				<text :class="{Skeleton:!loaded}">{{data.title2}}</text>
			</view>
			<text class="yticon icon-xia"></text>
		</view>
		<view class="actions">
			<text class="yticon icon-fenxiang2" @click="share"></text>
			<text class="yticon icon-Group-"></text>
			<text class="yticon icon-shoucang" :class="{active: data.favorite}" @click="favorite"></text>
		</view>

		<!-- 猜你喜欢 -->
		<view class="guess">
			<view class="section-tit">猜你喜欢</view>
			<view class="guess-list">
				<view 
					v-for="(item, index) in data.guessList" :key="index"
					class="guess-item"
				>
					<view class="image-wrapper">
						<image 
							:src="item.src" 
							:class="item.loaded" 
							mode="aspectFill"
							@load="imageOnLoad('guessList', index)" 
						></image>
					</view>
					<text class='title clamp' :class="{Skeleton:!loaded}">{{item.title}}</text>
					<text class="clamp" :class="{Skeleton:!loaded}">{{item.title2}}</text>
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<view class="evalution">
			<view class="section-tit">评论</view>
			<view class="eva-list" :class="{Skeleton:!loaded}">
				<view  v-for="(item, index) in data.evaList" :key="index"
					class="eva-item"
				>
					<image :src="item.src" mode="aspectFill"></image>
					<view class="eva-right">
						<text>{{item.nickname}}</text>
						<text>{{item.time}}</text>
						<view class="zan-box">
							<text>{{item.zan}}</text>
							<text class="yticon icon-shoucang"></text>
						</view>
						<text class="content">{{item.content}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 分享 -->
		<share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share>
	</view>
</template>

<script>
	import share from '@/components/share';
	export default {
		components: {
			share
		},
		data() {
			return {
				loaded: false,
				currentEpd: 1,
				data: {
					guessList: [{},{},{},{}] 
				},
				shareList: []
			};
		},
		async onLoad(){
			let detailData = await this.$api.json('detailData');
			let shareList = await this.$api.json('shareList');
			this.loaded = true;
			this.data = detailData;
			this.shareList = shareList;
			uni.setNavigationBarTitle({
				title: detailData.title
			})
		},
		methods:{
			imageOnLoad(key,index){
				this.$set(this.data[key][index], 'loaded', 'loaded');
			},
			changeEpd(index){
				let list = this.data.episodeList;
				let epd = list[index];
				this.$api.msg(`切换到第${epd}项`);
				this.currentEpd = epd;
			},
			//分享
			share(){
				this.$refs.share.toggleMask();	
			},
			//收藏
			favorite(){
				this.data.favorite = !this.data.favorite;
			}
		},
		//处理遮罩层物理返回键
		onBackPress(){
			if(this.$refs.share.show){
				this.$refs.share.toggleMask();
				return true;
			}
		}
	}
</script>

<style lang="scss" src="./detail.scss"></style>
