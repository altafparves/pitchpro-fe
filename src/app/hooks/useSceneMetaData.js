import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchStories } from "@/redux/features/Story/StorySlice";
import { sceneMetaData } from "../data/SceneMetaData";

export const useSceneMetaData = () => {
  const dispatch = useDispatch();
  const { stories, status } = useSelector((state) => state.stories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStories());
    }
  }, [dispatch, status]);

  const mergedNodes = useMemo(() => {
    if (!stories || stories.length === 0) return sceneMetaData;

    return sceneMetaData.map((node) => {
      // Only update nodes that have a story_id
      if (node.story_id) {
        const matchedStory = stories.find((s) => s.story_id === node.story_id);
        if (matchedStory) {
          return {
            ...node,
            status: matchedStory.status || node.status,
          };
        }
      }
      return node;
    });
  }, [stories]);

  return mergedNodes;
};
