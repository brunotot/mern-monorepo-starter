export type DtActionDef<T> = () => DtAction<T>;
export type DtActionList<T> = DtActionDef<T>[];

// TODO: Refactor DtAction to a plain Action.

type ActionBaseProps = {
  actionDependency?: React.ReactNode;
  actionRender?: React.ReactNode;
};

type ActionDatatableProps<T> = {
  clickHandler: (item: T, index?: number) => void;
};

type ActionStandaloneProps<T> = {
  clickHandler: (item: T) => void;
};

export type Action<T> = ActionBaseProps & ActionStandaloneProps<T>;

export type DtAction<T> = ActionBaseProps & ActionDatatableProps<T>;
