import {useForm} from "react-hook-form";
import {useAuth} from "react-oidc-context";
import {Api} from "../../services/BankingApi";
import styles from "./TransacationsControls.module.css";
import {AddAmount} from "./AddAmount";
import {getCurrencySymbol} from "../../common";

export const Deposit = ({account, onTransactionCompleted}) => {
    const types = [
        "Atm",
        "MobileDeposit",
        "DirectDeposit",
        "CashDeposit",
        "CheckDeposit",
        "AchTransfer",
        "TransferFromAnotherAccount"
    ];

    const incrementValues = [
        1,
        5,
        10,
        20,
        50,
        100,
        250,
        500
    ];

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setValue,
        reset
    } = useForm();

    const auth = useAuth();
    const api = Api(auth.user.access_token);

    const onSubmit = async (data) => {
        console.log("teste");
        const payload = {
            ...data,
            amount: parseFloat(data.amount)
        };

        await api.deposit(payload);
        reset();

        if (onTransactionCompleted) {
            onTransactionCompleted();
        }
    }

    return (
        <div className={styles.TransactionControls}>
            <h4>Deposit</h4>
            <fieldset>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.Inline}>
                        <input type="hidden" defaultValue={account.id} {...register("accountId")}/>
                        <div>
                            <label>
                                Amount ({getCurrencySymbol("pt-BR", account.currency)})
                                <input type="number"
                                       defaultValue={0.00}
                                       min={0.01}
                                       max={1_000_000}
                                       step={0.01}
                                       {...register("amount", {required: true})}/>
                            </label>
                        </div>
                        <div>
                            <label>
                                Type
                                <select {...register("depositType", {required: true})}>
                                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className={styles.AddAmountControls}>
                        {incrementValues.map((value, index) => (
                            <AddAmount value={parseFloat(watch("amount"))}
                                       increment={value}
                                       currency={account.currency}
                                       onIncrement={(value) => setValue("amount", value)}
                                       key={index}
                            />
                        ))}
                    </div>
                    <div>
                        <input type="submit" value="Deposit" className={[styles.Button, styles.Success].join(" ")}/>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}