import { fp } from '@app/lib/utils';

const textVariants = {
  heading1: {
    fontSize: fp(3),
    color: 'text',
  },
  heading2: {
    fontSize: fp(2.5),
    color: 'text',
  },
  heading3: {
    fontSize: fp(2.2),
    color: 'text',
  },
  subheading: {
    fontSize: fp(1.7),
    color: 'placeholder',
  },
  button: {
    fontSize: fp(1.7),
    color: 'white',
  },
  title: {
    fontSize: fp(1.7),
  },
  linkbutton: {
    fontSize: fp(1.6),
    color: 'grey',
  },

  inputlabel: {
    fontSize: fp(1.5),
    color: 'text',
  },
  error: {
    color: 'danger',
    fontSize: fp(1.5),
  },
  comment: {
    fontSize: fp(1.5),
  },
  caption: {
    fontSize: fp(1.8),
    color: 'bodyText',
  },
  body: {
    fontSize: fp(2),
    color: 'bodyText',
  },
};

export default textVariants;
