import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchStories } from "@/redux/features/Story/StorySlice";
import { sceneData } from "../data/SceneData";

export const useMergedNodes = () => {
  const dispatch = useDispatch();
  const { stories, status } = useSelector((state) => state.stories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStories());
    }
  }, [dispatch, status]);

  const mergedNodes = useMemo(() => {
    return sceneData.map((node) => {
      if (node.story_id) {
        const matchedStory = stories.find((s) => s.story_id === node.story_id);
        if (matchedStory) {
          return {
            ...node,
            status: matchedStory.status ?? node.status,
            tema: matchedStory.tema ?? node.tema,
          };
        }
      }
      return node;
    });
  }, [stories]);

  return mergedNodes;
};
