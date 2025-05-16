"use client";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "@/redux/features/Story/StorySlice";
import { fetchVideos } from "@/redux/features/video/videoSlice";
import { sceneMetaData } from "../data/SceneMetaData";
export const useSceneMetaData = () => {
  const dispatch = useDispatch();
  const { stories, status: storiesStatus } = useSelector((state) => state.stories);
  const { videos, loading: videosLoading } = useSelector((state) => state.video);

  useEffect(() => {
    if (storiesStatus === "idle") {
      dispatch(fetchStories());
    }
    if (videos.length === 0 && !videosLoading) {
      dispatch(fetchVideos());
    }
  }, [dispatch, storiesStatus, videos.length, videosLoading]);

  const mergedData = useMemo(() => {
    const videoMap = new Map();
    videos.forEach((video) => {
      videoMap.set(video.fileName, video.videoUrl);
    });

    const resolveSrc = (srcGroup) => {
      const newGroup = {};
      for (const key in srcGroup) {
        const fileName = srcGroup[key];
        newGroup[key] = {
          fileName,
          videoUrl: videoMap.get(fileName) || null,
        };
      }
      return newGroup;
    };

    return sceneMetaData.map((node) => {
      const updatedNode = { ...node };

      if (node.src) {
        updatedNode.src = {};
        if (node.src.checkpoint) {
          updatedNode.src.checkpoint = resolveSrc(node.src.checkpoint);
        }
        if (node.src.cutscene) {
          updatedNode.src.cutscene = resolveSrc(node.src.cutscene);
        }
        if (node.src.material) {
          updatedNode.src.material = resolveSrc(node.src.material);
        }
      }

      if (node.story_id) {
        const matchedStory = stories.find((s) => s.story_id === node.story_id);
        if (matchedStory) {
          updatedNode.is_pre_test = matchedStory["is_pre-test"];
          updatedNode.is_post_test = matchedStory["is_post-test"];
        }
      }

      if (node.checkpoint_pack) {
        const relatedStories = stories.filter((s) => s.checkpoint_pack === node.checkpoint_pack).sort((a, b) => a.chapter - b.chapter);
        if (relatedStories.length > 0) {
          const storyMap = {};
          relatedStories.forEach((story, index) => {
            storyMap[index + 1] = story;
          });
          updatedNode.story = storyMap;
        }
      }

      return updatedNode;
    });
  }, [videos, stories]);

  const isLoading = storiesStatus !== "succeeded" || videosLoading;

  return { mergedData, isLoading };
};

