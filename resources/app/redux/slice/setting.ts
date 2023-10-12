import { createSlice } from '@reduxjs/toolkit';
import {
  updateBodyClass,
  updateHtmlClass,
  updateHtmlAttr,
  updateTitle,
  updateColorRootVar,
  updateStorage,
  updateDomValueBySetting,
  getStorage,
} from '@/utilities/setting';
import { setFontFamily } from '../../utilities/root-var';
import _ from 'lodash';
import { defaultSettingState, initialSettingState } from '../state';
const DefaultSetting = defaultSettingState.setting;

const Choices = {
  SchemeChoice: DefaultSetting.theme_scheme.choices,
  ColorChoice: DefaultSetting.theme_color.choices,
  StyleAppearanceChoice: DefaultSetting.theme_style_appearance.choices,
  FSChoice: DefaultSetting.theme_font_size.choices,
  Animation: DefaultSetting.theme_transition.choices,
};

const createSettingObj = (state: any) => {
  return {
    saveLocal: state.saveLocal,
    storeKey: state.storeKey,
    setting: _.cloneDeep(state.setting),
  };
};

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialSettingState,
  reducers: {
    setSetting: state => {
      const json = getStorage(state.storeKey);
      if (json === 'none') state.saveLocal = 'none';
      if (json !== null && json !== 'none') {
        state.saveLocal = json.saveLocal;
        state.setting = json.setting;
      }
      updateDomValueBySetting(state.setting, Choices);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    reset_state: state => {
      state.setting = defaultSettingState.setting;
      updateDomValueBySetting(state.setting, Choices);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    saveLocal: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.saveLocal = action.payload;
      }
      const settingObj = {
        saveLocal: state.saveLocal,
        storeKey: state.storeKey,
        setting: _.cloneDeep(state.setting),
      };
      updateStorage(state.saveLocal, state.storeKey, settingObj);
    },
    app_name: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.app_name.value = action.payload;
      }
      updateTitle(state.setting.app_name.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_scheme_direction: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_scheme_direction.value = action.payload;
      }
      updateHtmlAttr({ prop: 'dir', value: state.setting.theme_scheme_direction.value });
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_scheme: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_scheme.value = action.payload;
      }
      updateBodyClass(Choices.SchemeChoice, state.setting.theme_scheme.value);
      updateColorRootVar(state.setting.theme_scheme.value, state.setting.theme_color, Choices.ColorChoice);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_style_appearance: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_style_appearance.value = action.payload;
      }
      updateBodyClass(Choices.StyleAppearanceChoice, state.setting.theme_style_appearance.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_color: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        _.forEach(action.payload.colors, (value, key) => {
          state.setting.theme_color.colors[key] = value;
        });
        state.setting.theme_color.value = action.payload.value;
      }
      updateBodyClass(Choices.ColorChoice, state.setting.theme_color.value);
      updateColorRootVar(state.setting.theme_scheme.value, state.setting.theme_color, Choices.ColorChoice);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_transition: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_transition.value = action.payload;
      }
      updateBodyClass(Choices.Animation, state.setting.theme_transition.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_font_size: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_font_size.value = action.payload;
      }
      updateHtmlClass(Choices.FSChoice, state.setting.theme_font_size.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    page_layout: (state, action) => {
      state.setting.page_layout.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    header_navbar: (state, action) => {
      state.setting.header_navbar.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    header_banner: (state, action) => {
      state.setting.header_banner.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    sidebar_color: (state, action) => {
      state.setting.sidebar_color.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    sidebar_type: (state, action) => {
      state.setting.sidebar_type.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    sidebar_menu_style: (state, action) => {
      state.setting.sidebar_menu_style.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    footer: (state, action) => {
      state.setting.footer.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    body_font_family: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.body_font_family.value = action.payload;
      }
      setFontFamily('body', state.setting.body_font_family.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    heading_font_family: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.heading_font_family.value = action.payload;
      }
      setFontFamily('heading', state.setting.heading_font_family.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
  },
});

export const { reducer: settingReducer } = settingSlice;

export const {
  reset_state,
  app_name,
  theme_scheme_direction,
  theme_scheme,
  theme_style_appearance,
  theme_color,
  theme_transition,
  theme_font_size,
  page_layout,
  header_navbar,
  header_banner,
  sidebar_color,
  sidebar_type,
  sidebar_menu_style,
  footer,
  body_font_family,
  heading_font_family,
  setSetting,
} = settingSlice.actions;

export const settingAction = settingSlice.actions;