const initialState = {
  scene: {},
};

function getCurrentScene(routes) {
  if (routes.index !== 0) {
    return getCurrentScene(routes.children[routes.index]);
  }

  return routes;
}

export default function RouterReducer(actionTypes = [], state = initialState, action = {}) {
  if (actionTypes.includes(action.type)) {
    let currentSceneKey = null;

    if (action.scene.children) {
      const children = action.scene.children[action.scene.index];
      currentSceneKey = getCurrentScene(children).sceneKey;
    } else {
      currentSceneKey = action.scene.sceneKey;
    }

    return {
      ...state,
      currentSceneKey,
    };
  }

  return state;
}
