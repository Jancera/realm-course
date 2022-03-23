import React, {
  createContext,
  useContext,
  FC,
  useEffect,
  useState,
} from "react";
import Realm from "realm";
import getRealm from "../../infrastructure/realm";

export const RealmContext = createContext<Realm | undefined>(undefined);

const RealmContextProvider: FC = ({ children }) => {
  const [realm, setRealm] = useState<Realm | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setRealm(await getRealm());
    })();
  }, []);

  return (
    <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
  );
};

export const useMainContext = () => useContext(RealmContext);

export default RealmContextProvider;
