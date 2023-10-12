import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { settingAction } from '@/redux/slice';

type RadioBtnProps = {
  btnName: string;
  className: string;
  inputclassName: string;
  labelclassName: string;
  id: string;
  defaultChecked: string;
  value: string;
  children: React.ReactNode;
};

export const RadioBtn = memo((props: RadioBtnProps) => {
  const dispatch = useDispatch();

  const radioCheckValue = (selector, value) => {
    if (selector === value) {
      return true;
    }
    return false;
  };
  return (
    <div className={`${props.className}`}>
      <input
        type="radio"
        value={props.value}
        className={props.inputclassName}
        name={props.btnName}
        id={props.id}
        autoComplete="off"
        defaultChecked={radioCheckValue(props.defaultChecked, props.value)}
        onClick={() => dispatch(settingAction[props.btnName](props.value))}
      />
      <label className={props.labelclassName} htmlFor={props.id}>
        {props.children}
      </label>
    </div>
  );
});
