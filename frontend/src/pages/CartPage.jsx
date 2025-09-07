import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Grid, Button, Paper, TableCell, TableContainer, TableRow, TableHead, TableBody, Table,IconButton,Typography,Stack,Card,TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Avatar from "@mui/material/Avatar";
import NavBar from "../components/NavBar";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MarkunreadMailbox from "@mui/icons-material/MarkunreadMailbox";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import emptyCartImg from "../img/emptycart.png";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const addedItems = useSelector((state) => state.cartStore.addedItems);
  const total = useSelector((state) => state.cartStore.total);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [accountDialog, setAccountDialog] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [confirmShow, setConfirmShow] = React.useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  useEffect(() => {
    if (total !== undefined) {
      setTotalAmount(`$${total.toFixed(2)}`);
    }
  }, [total, addedItems, totalAmount]);

  const goBack = () => {
    navigate("/");
  };

  const cartItemRemoveHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const cartItemAddHandler = (item) => {
   
    const product_item = {
      product: item,
      amount: 1,
    };
    dispatch(addToCart(product_item));
  };

  const handleCheckout = async () => {
    if (!authContext.token) {
      setOpen(true);
    } else {
      setConfirmShow(true);
    }
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setCheckoutForm({ ...checkoutForm, [name]: value });
  };

  const handleGoToLogin = () => {
    setShowLogin(true);
    setAccountDialog(true);
    setOpen(false);
  };

  const handleCreateAccount = () => {
    setShowLogin(false);
    setAccountDialog(true);
    setOpen(false);
  };

  const handleCloseAccountDialog = async () => {
    setAccountDialog(false);
    setConfirmShow(true);
  };

  const handleCancel = () => {
    setConfirmShow(false);
  };

  const handleConfirm = async () => {
    const order = {
      userID: localStorage.getItem("userId"),
      firstName: checkoutForm.firstName,
      lastName: checkoutForm.lastName,
      address: checkoutForm.address,
      city: checkoutForm.city,
      country: checkoutForm.country,
      zipCode: checkoutForm.zipCode,
      totalAmount: totalAmount,
      items: addedItems,
      createdDate: new Date(),
    };
    try {
      const response = await axios.post("http://localhost:5000/order/create", {
        data: order,
      });
      if (response.data === "Order saved to the database!") {
        dispatch(emptyCart());
        setConfirmShow(false);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
    console.log(order);
  };
