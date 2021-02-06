<template>
  <section class="broadcasts">
    <div class="broadcasts__videos">
      <video id="self-video-container" autoplay playsinline></video>

    </div>


    <button @click="connect()">Connect</button>
  </section>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, inject } from "vue";
import { useRoute } from "vue-router";

import { useStore } from "../../store";
import { useRouter } from "../../router";

import Loader from '../Loader';

export default defineComponent({
  name: "Broadcasts",
  components: {
    Loader,
  },
  setup(props, context) {
    const gWindow = inject('$window');

    const store = useStore();
    const router = useRouter();

    const videos = [];

    const state = reactive({
      mediaConnector: ref(null),
      videos: ref([
        { id: 'self-video-container', isSelf: true }
      ])
    });

    // const state = reactive({
    //   connection: ref(store.getters.getConnection), // WebSocket
    //   originUrl: ref(''),
    //   isLoading: ref(false),
    //   isConnected: computed(() => store.getters.getConnectionState),
    // });

    // watch(
    //   () => state.isConnected,
    //   (current, previous) => {
    //     if (current && !previous) {
    //       fetchConversations();
    //     }
    //   }
    // );

    const conversationId = computed(() => {
      return useRoute().params.id;
    });

    const userId = computed(() => store.getters.getCurrentUserId);

    // const mediaConnector = new window.WTKurentoMediaConnector(false);

    // запрос доступа к камере и микрофону
    const connect = (config) => {
      debugger
      // config = config || state.mediaConnector.Config;
      config = { SendVideo: false, SendAudio: true }

      if (state.mediaConnector.Status) {
        state.mediaConnector.Disconnect(() => {
          // Delete video
          connect(config);
        })
      } else {
        state.mediaConnector.Config = config;
        state.mediaConnector.GoToRoom('self-video-container', processVideo.bind(this));
      }
    }

    const disconnect = () => {
      state.mediaConnector.Disconnect(() => {
        console.log('Disconnecting...');
      });
    }

    const configurate = () => {
      console.log('configurate??');
      console.log(state.mediaConnector.Config = {
        "LoadingVideoBackground": '',
        "IdleVideoBackground": '',
        "LogLevel": 2,
        "RoomNumber": conversationId,
        "AutoReconnect": true
      });
      // state.mediaConnector.Config = {
      //   "LoadingVideoBackground": '',
      //   "IdleVideoBackground": '',
      //   "LogLevel": 2,
      //   "RoomNumber": conversationId,
      //   "AutoReconnect": true
      // }
      console.log(state.mediaConnector.Config);

      state.mediaConnector.Data = { user_id: userId, user_name: '', signalSource: 'webcam' };
      state.mediaConnector.Source = 'webcam';
      state.mediaConnector.Events = {
        UserHasLeftEvent: userLeft.bind(this),
        UpdateRemoteMediaEvent: updateMedia.bind(this),
        DetectAudioHeartbeat: detectTalking.bind(this)
      }
    }

    const userLeft = (id, media, data) => {
      console.log('user left', id, media, data);
    }

    const updateMedia = (id, config, data) => {
      console.log('update media', id, config, data);
    }

    const detectTalking = (isTalking, sessionId, data) => {
      console.log('detect talking', isTalking, sessionId, data);
    }

    const processVideo = (mediaConnectorData) => {
      console.log('process video', mediaConnectorData);
    }

    onMounted(() => {
      setTimeout(() => {
        state.mediaConnector = new gWindow.WTKurentoMediaConnector(false);
        configurate();
      }, 100);
    });

  //   private _processVideo(MediaConnectorData: MediaConnectorData) {
  //   if (MediaConnectorData.signalsource === 'webcam') {
  //     this._addVideo(MediaConnectorData);
  //   } else if (MediaConnectorData.signalsource === 'screen') {
  //     this._addScreen(MediaConnectorData);
  //   }

  //   return new Promise((resolve, reject) => {
  //     if (MediaConnectorData.signalsource === 'webcam') {
  //       this.videoInited$
  //         .pipe(filter(containerId => (containerId === 'my_video' && MediaConnectorData.data.user_id === this.currentParticipant.id) || (containerId === `webcam_for_${MediaConnectorData.data.user_id}`)))
  //         .subscribe(containerId => {
  //           resolve({ media: document.getElementById(containerId) })
  //         });
  //     } else if (MediaConnectorData.signalsource === 'screen') {
  //       this.streamInited$
  //         .pipe(filter(containerId => (containerId === 'my_screen' && MediaConnectorData.data.user_id === this.currentParticipant.id) || (containerId === `screen_for_${MediaConnectorData.data.user_id}`)))
  //         .subscribe(containerId => {
  //           resolve({ media: document.getElementById(containerId) })
  //         });
  //     }
  //   });
  // }

  //   private _userLeft(id: string, media: HTMLVideoElement, data: any) {
  //   try {
  //     let userId = data.user_id || media.getAttribute('id').split('_').slice().pop();
  //     let signalSource = data.signalSource;

  //     if (signalSource === 'webcam') {
  //       this._deleteVideo([userId]);
  //     } else if (signalSource === 'screen') {
  //       this._deleteScreen([userId]);
  //     } else {
  //       throw new Error(`Unknown signal source - ${signalSource}`)
  //     }
  //   } catch(err) {
  //     console.error(`[UserLeft] ${err}`);
  //   }
  // }

  // private _updateMedia(id: string, config: { videoOn: boolean, audioOn: boolean }, data: any) {
  //   let userId = data.user_id;
  //   let signalSource = data.signalSource;

  //   try {
  //     if (signalSource === 'webcam') {
  //       this.participantChangeMedia$.emit({ participantId: userId, config: { audioOn: config.audioOn, videoOn: config.videoOn }});

  //       let video = this.videos.find(v => v.user.data.user_id === userId);
  //       if (video) {
  //         video.user.videoOn = config.videoOn;
  //         video.user.audioOn = config.audioOn;
  //       }

  //       this.videos$.next(this.videos);
  //     } else if (signalSource === 'screen') {
  //       let stream = this.streams.find(s => s.user.data.user_id === userId);
  //       if (stream) {
  //         stream.user.videoOn = config.videoOn;
  //         stream.user.audioOn = config.audioOn;
  //       }

  //       this.streams$.next(this.streams);
  //     } else {
  //       throw new Error(`Unknown signal source - ${signalSource}`)
  //     }
  //   } catch(err) {
  //     console.error(`[UpdateMedia] ${err}`);
  //   }
  // }

  // private _detectTalking(bTalking: boolean, SessionID: string, data: any) {
  //   let userId = data.user_id;
  //   let videoIndex = this.videos.findIndex(v => v.user.data.user_id === userId);
  //   if (videoIndex >= 0) {
  //     let video = this.videos[videoIndex];
  //     if (video) {
  //       video.isTalking = bTalking;
  //       this._sortByTalking(bTalking);
  //       this.participantTalking$.emit({ participantId: userId, isTalking: bTalking });
  //     }
  //   }
  // }


    // this.videoConnector.Data = { user_id: this.currentParticipant.id, user_name: this.currentParticipant.fullname, signalSource: 'webcam' }
    // this.videoConnector.Source = 'webcam';
    // this.videoConnector.Events = {
    //   UserHasLeftEvent: this._userLeft.bind(this),
    //   UpdateRemoteMediaEvent: this._updateMedia.bind(this),
    //   DetectAudioHeartbeat: this._detectTalking.bind(this)
    // };

    // const isLoaded = computed(() => store.getters.getConversationLoading);

    // const conversations = computed(() => store.getters.getConversations);
    // const selectedConversationId = computed(() => {
    //   const conversationId = store.getters.getSelectedConversationId;
    //   if (conversationId) {
    //     router.push({ path: `/conversation/${conversationId}` });
    //   }

    //   return conversationId;
    // });

    // function selectConversation(conversationId) {
    //   store.dispatch("selectConversation", conversationId);
    // }

    // return {
    //   router,
    //   isLoaded,
    //   conversations,
    //   selectedConversationId,
    //   selectConversation
    // };

    return {
      state,
      conversationId,
      connect
    }
  }
});
</script>
