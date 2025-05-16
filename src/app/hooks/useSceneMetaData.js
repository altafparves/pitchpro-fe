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

  const mergedData = useMemo(() => {
  if (!stories || stories.length === 0) return sceneMetaData;

  return sceneMetaData.map((node) => {
    const updatedNode = { ...node };

    // Step 1: Merge story by `story_id` for post-test status
    if (node.story_id) {
      const matchedStory = stories.find((s) => s.story_id === node.story_id);
      if (matchedStory) {
        // Update is_pre_test and is_post_test to match the story data
        updatedNode.is_pre_test = matchedStory["is_pre-test"];
        updatedNode.is_post_test = matchedStory["is_post-test"];
      }
    }

    // Step 2: Collect all stories with the same checkpoint_pack (if defined)
    if (node.checkpoint_pack) {
      const relatedStories = stories
        .filter((s) => s.checkpoint_pack === node.checkpoint_pack)
        .sort((a, b) => a.chapter - b.chapter); 

      // Step 3: Convert them to object indexed by chapter or 1-based index
      if (relatedStories.length > 0) {
        const storyMap = {};
        relatedStories.forEach((story, index) => {
          // You can use index + 1 or chapter or story_id as the key
          storyMap[index + 1] = story;
        });

        updatedNode.story = storyMap;
      }
    }

    return updatedNode;
  });
}, [stories]);

  return mergedData;
};
