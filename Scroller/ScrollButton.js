import {$L} from '@enact/i18n';
import kind from '@enact/core/kind';
import Holdable from '@enact/ui/Holdable';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import React from 'react';

import IconButton from '../IconButton';

import css from './Scrollbar.less';

const HoldableIconButton = Holdable({endHold: 'onLeave'}, IconButton);

const classNameMap = {
	up: css.scrollbarUpButton,
	down: css.scrollbarBottomButton,
	left: css.scrollbarLeftButton,
	right: css.scrollbarRightButton
};

/**
 * {@link moonstone/Scroller.ScrollButtonBase} is the base implementation for
 * {@link moonstone/Scroller.ScrollButton}.
 *
 * @class ScrollButtonBase
 * @memberof moonstone/Scroller
 * @ui
 * @private
 */
const ScrollButtonBase = kind({
	name: 'ScrollButton',

	propTypes: /** @lends moonstone/Scroller.ScrollButtonBase.prototype */ {
		/**
		 * Name of icon
		 *
		 * @type {String}
		 * @public
		 */
		children: React.PropTypes.string.isRequired,

		/**
		 * Scroll direction for this button (down, left, right, or up)
		 *
		 * @type {String}
		 * @public
		 */
		direction: React.PropTypes.oneOf(['down', 'left', 'right', 'up']).isRequired,

		/**
		 * When `true`, the component is shown as disabled and does not generate `onClick`
		 * [events]{@glossary event}.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: React.PropTypes.bool
	},

	computed: {
		className: ({direction}) => classNameMap[direction],
		'aria-label': ({direction}) => $L(`scroll ${direction}`)
	},

	render: ({children, disabled, ...rest}) => {
		delete rest.direction;

		return (
			<HoldableIconButton
				{...rest}
				backgroundOpacity="transparent"
				disabled={disabled}
				small
			>
				{children}
			</HoldableIconButton>
		);
	}
});


/**
 * {@link moonstone/Scroller.ScrollButton} is an {@link moonstone/IconButton.IconButton} used within
 * a {@link moonstone/Scroller.Scrollbar}.
 *
 * @class ScrollButton
 * @memberof moonstone/Scroller
 * @ui
 * @private
 */
const ScrollButton = onlyUpdateForKeys(['children', 'disabled'])(
	ScrollButtonBase
);

export default ScrollButton;
export {
	ScrollButton,
	ScrollButtonBase
};