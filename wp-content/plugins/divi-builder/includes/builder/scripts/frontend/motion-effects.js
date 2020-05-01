// External dependencies
import {
  debounce,
  endsWith,
  filter,
  forEach,
  get,
  groupBy,
  isArray,
  isEmpty,
  isObject,
  map,
  size,
} from 'lodash';

// Internal dependencies
import * as DOM from '@frontend-builder/features/scroll-effects/fe/io/dom';
import { ETBuilderScrollEffects } from '@frontend-builder/features/scroll-effects';
import { convertTransforms } from '@frontend-builder/features/scroll-effects/vb/helpers';
import { fromObject } from '@frontend-builder/features/scroll-effects/entities/scroll-effect';
import ETBuilderOffsetsConst from '@frontend-builder/constants/et-builder-offsets-const';
import { Window } from '@frontend-builder/features/scroll-effects/stores/window';
import { top_window } from '@core/admin/js/frame-helpers';
import { getContentAreaSelector } from 'gutenberg/utils/selectors';

const isBlockEditor = $(top_window.document).find(getContentAreaSelector(top_window, true)).length > 0;
const isBuilder     = isObject(window.ET_Builder) && size(window.ET_Builder) > 1 && !isBlockEditor;

const getViewportWidth     = () => jQuery(window).width();
const toItem               = (effects, id) => ({ id, effects: (effects || []).map(fromObject), });
const getSelector          = (step, id) => `body[data-scroll-step="${step}"] ${id}`;
const scrollEffects        = new ETBuilderScrollEffects(DOM, getSelector);

let motionEffectsLoaded = false;

const getMotionElementsFE = () => {
  const allMotionElements = window.et_pb_motion_elements || [];

  // We are on the real FE, so load all the motion elements.
  if (!isBuilder || isEmpty(allMotionElements)) {
    return allMotionElements;
  }

  /**
   * We're inside the Builder, but still need to render motion effects from the TB
   * Get all the motion elements for TB parts of the layout
   */
  const breakpoints = ['desktop', 'tablet', 'phone'];
  let tb_motion_elements = {};

  forEach(breakpoints, breakpoint => {
    tb_motion_elements[ breakpoint ] = filter(window.et_pb_motion_elements[ breakpoint ], (el) => (endsWith(el.id, '_tb_header') || endsWith(el.id, '_tb_body') || endsWith(el.id, '_tb_footer')));
  });

  return tb_motion_elements;
}

const toggleMotionElements = (state = 'hide') => {
  const activeMotionElements = getMotionElementsFE();
  const elementsList         = get(activeMotionElements, 'desktop', []);

  if (isEmpty(elementsList)) {
    return;
  }

  forEach(elementsList, element => {
    const $element = jQuery(element.id);
    if ('hide' === state) {
      $element.addClass('et-pb-before-scroll-animation');
    } else {
      $element.removeClass('et-pb-before-scroll-animation et_animated et-waypoint');
      $element.addClass('et_had_animation');
    }
  });
}

/**
 * @param {number} width
 * @return {string}
 */
const getDevice        = width => {
  if (width <= ETBuilderOffsetsConst.responsiveLandscape.phone) {
    return 'phone';
  }

  if (width <= ETBuilderOffsetsConst.responsiveLandscape.tablet) {
    return 'tablet';
  }

  return 'desktop';
};

const getChildren = (element, effects) => {
  const childrenCount = parseInt(element.children_count);
  let children = {};

  if (childrenCount > 0) {
    for(let i = 0; i < childrenCount; i++) {
      const key = `.${element.module_type}_item_${element.module_index}_${i}`;
      children[key] = effects;
    }
  }

  return children;
}

/**
 * @param {[object]} elements
 * @param {string} device
 */
const updateItems = (elements, device) => {
  const groupedElements = groupBy(elements[device] || [], 'id');
  map(groupedElements, toItem)
    .forEach(({ id, effects }) => {
      if (!isEmpty(effects) && isArray(effects)) {
        const element        = get(groupedElements, [id, '0'], {});
        const start          = get(element, 'trigger_start', 'middle');
        const end            = start; // Use only one offset point right now. Update the value here if/when we add second point.
        const motionTriggers = {start, end};

        if ('on' === element.grid_motion) {
          if (!element.child_slug) {
            const children = getChildren(element, effects);

            forEach(children, (childModule, id) => {
              scrollEffects.add(id, childModule, motionTriggers);
            });
          }
        } else {
          const transforms = isEmpty(element.transforms) ? {} : convertTransforms(element.transforms);
          scrollEffects.add(id, [...transforms, ...effects], motionTriggers);
        }
      } else {
        scrollEffects.remove(id);
      }
    });

  if (!motionEffectsLoaded) {
    motionEffectsLoaded = true;
    setTimeout(() => toggleMotionElements('show'), 200);
  }
};

const activeMotionElements = getMotionElementsFE();

if (!isEmpty(activeMotionElements)) {
  const $window     = $(window);
  const windowStore = new Window($window.width(), $window.height());
  const elements    = activeMotionElements;
  let device        = getDevice(getViewportWidth());

  // Hide all the elements on page load so scroll effects applied smoothly
  toggleMotionElements();

  jQuery(window).on('load', debounce(() => updateItems(elements, device), 500));
  jQuery(window).on('resize', debounce(() => windowStore.setWidth($window.width()).setHeight($window.height()), 500));

  windowStore.addSizeChangeListener(() => {
    const newDevice = getDevice(getViewportWidth());

    if (newDevice !== device) {
      device = newDevice;

      updateItems(elements, device);
    } else {
      scrollEffects.refresh();
    }
  });
}
