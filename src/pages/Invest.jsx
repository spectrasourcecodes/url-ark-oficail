// src/pages/Invest.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  X, 
  Copy, 
  Check,
  Wallet,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Shield,
  Zap,
  BarChart3,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  History,
  Star,
  Rocket,
  Target,
  Crown,
  Users  // ← Add Users here
} from 'lucide-react';
import { toast } from 'react-toastify';

// ... rest of your component code remains the same

const Invest = () => {
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const assets = [
    { 
      id: 'BTC', 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      price: 52345, 
      change: 5.2, 
      apy: 8.5,
      icon: '₿',
      color: 'from-orange-500 to-yellow-500',
      bg: 'bg-orange-50',
      textColor: 'text-orange-600',
      risk: 'Baixo'
    },
    { 
      id: 'ETH', 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: 3234, 
      change: 3.8, 
      apy: 6.2,
      icon: 'Ξ',
      color: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
      textColor: 'text-blue-600',
      risk: 'Baixo'
    },
    { 
      id: 'USDT', 
      name: 'Tether', 
      symbol: 'USDT', 
      price: 1.00, 
      change: 0.01, 
      apy: 4.5,
      icon: '💵',
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      textColor: 'text-green-600',
      risk: 'Muito Baixo'
    },
    { 
      id: 'SOL', 
      name: 'Solana', 
      symbol: 'SOL', 
      price: 142.50, 
      change: 7.2, 
      apy: 9.5,
      icon: 'SOL',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      textColor: 'text-purple-600',
      risk: 'Médio'
    },
  ];

  // Investment Plans with predefined amounts and returns
  const investmentPlans = [
    {
      id: 'starter',
      name: 'Plano Starter',
      icon: Star,
      minAmount: 100,
      maxAmount: 500,
      returnRate: 5,
      period: '7 dias',
      description: 'Ideal para iniciantes',
      features: ['Retorno garantido', 'Suporte básico', 'Saque diário'],
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      borderColor: 'border-blue-200',
      popularity: 'Popular'
    },
    {
      id: 'growth',
      name: 'Plano Growth',
      icon: TrendingUp,
      minAmount: 501,
      maxAmount: 2000,
      returnRate: 12,
      period: '14 dias',
      description: 'Crescimento acelerado',
      features: ['Retorno premium', 'Suporte prioritário', 'Saque flexível', 'Bônus de indicação'],
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      borderColor: 'border-purple-200',
      popularity: 'Mais Escolhido'
    },
    {
      id: 'premium',
      name: 'Plano Premium',
      icon: Crown,
      minAmount: 2001,
      maxAmount: 10000,
      returnRate: 20,
      period: '30 dias',
      description: 'Máximo retorno',
      features: ['Retorno máximo', 'Suporte VIP 24/7', 'Saque prioritário', 'Cashback mensal', 'Consultoria exclusiva'],
      color: 'from-orange-500 to-red-500',
      bg: 'bg-orange-50',
      borderColor: 'border-orange-200',
      popularity: 'VIP'
    },
    {
      id: 'enterprise',
      name: 'Plano Enterprise',
      icon: Rocket,
      minAmount: 10001,
      maxAmount: 100000,
      returnRate: 30,
      period: '45 dias',
      description: 'Para grandes investidores',
      features: ['Retorno exclusivo', 'Gerente dedicado', 'Saque instantâneo', 'Eventos exclusivos', 'Yield farming avançado'],
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      borderColor: 'border-green-200',
      popularity: 'Limitado'
    },
  ];

  const walletAddresses = {
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x742d35Cc6634C0532925a3b844Bc5e75dC7a3a5d',
    USDT: '0x742d35Cc6634C0532925a3b844Bc5e75dC7a3a5d',
    SOL: 'solana_wallet_address_demo_123456789',
  };

  const selectedAssetData = assets.find(a => a.id === selectedAsset);
  const selectedPlan = investmentPlans.find(p => p.id === selectedPlanId);

  const calculateProjectedReturn = () => {
    if (!selectedPlan) return 0;
    const amount = selectedPlan.minAmount;
    const multiplier = selectedPlan.returnRate / 100;
    return amount * multiplier;
  };

  const totalAmount = selectedPlan ? selectedPlan.minAmount + calculateProjectedReturn() : 0;

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
  };

  const handleInvestNow = () => {
    if (!selectedPlanId) {
      toast.error('Por favor, selecione um plano de investimento');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success('Endereço da carteira copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePaymentConfirmed = () => {
    if (!agreeToTerms) {
      toast.error('Por favor, aceite os termos e condições');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Solicitação enviada! A carteira será atualizada em breve.");
      setIsModalOpen(false);
      setSelectedPlanId(null);
      setAgreeToTerms(false);
    }, 2000);
  };

  const walletAddress = walletAddresses[selectedAsset];
  const projectedReturn = calculateProjectedReturn();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Planos de Investimento
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <History className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white mb-8 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Comece a Ganhar Hoje</h2>
              <p className="text-white/80">Escolha o plano ideal para seu perfil de investidor</p>
            </div>
            <Sparkles className="w-12 h-12 text-white/30" />
          </div>
        </div>

        {/* Asset Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecionar Ativo</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 overflow-hidden group
                  ${selectedAsset === asset.id 
                    ? `border-${asset.color.split('-')[1]}-500 bg-gradient-to-br ${asset.color} bg-opacity-10` 
                    : 'border-gray-200 hover:border-gray-300 bg-white'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${asset.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative">
                  <div className={`w-12 h-12 ${asset.bg} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                    <span className={`text-2xl ${asset.textColor}`}>{asset.icon}</span>
                  </div>
                  <p className="font-semibold text-sm">{asset.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatCurrency(asset.price)}</p>
                  <p className={`text-xs font-medium mt-1 ${
                    asset.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </p>
                  {selectedAsset === asset.id && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Investment Plans Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Planos de Investimento</h2>
              <p className="text-gray-600 mt-1">Escolha o plano que melhor se adequa aos seus objetivos</p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-gray-500">Retorno garantido</span>
              <Shield className="w-4 h-4 text-green-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentPlans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlanId === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl transition-all duration-300 cursor-pointer
                    ${isSelected 
                      ? `ring-2 ring-blue-500 shadow-2xl transform scale-105` 
                      : 'hover:shadow-xl hover:transform hover:-translate-y-1'}`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {/* Popular Badge */}
                  {plan.popularity !== 'Popular' && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className={`px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${plan.color} shadow-lg`}>
                        {plan.popularity}
                      </div>
                    </div>
                  )}
                  
                  <div className={`bg-white rounded-2xl overflow-hidden border-2 ${isSelected ? plan.borderColor : 'border-gray-100'}`}>
                    {/* Header */}
                    <div className={`p-6 bg-gradient-to-br ${plan.color} text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="w-8 h-8 text-white/90" />
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                          {plan.period}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-white/80 text-sm">{plan.description}</p>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline justify-between">
                          <span className="text-3xl font-bold text-gray-900">
                            {formatCurrency(plan.minAmount)}
                          </span>
                          <span className="text-sm text-gray-500">mínimo</span>
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-2xl font-bold text-green-600">
                            +{plan.returnRate}%
                          </span>
                          <span className="text-sm text-gray-500">retorno</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Max Amount */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Valor máximo:</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(plan.maxAmount)}</span>
                        </div>
                      </div>

                      {/* Select Button */}
                      <button
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
                          ${isSelected 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {isSelected ? 'Plano Selecionado ✓' : 'Selecionar Plano'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Plan Summary */}
        {selectedPlan && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Plano Selecionado: {selectedPlan.name}</h3>
                <p className="text-gray-600">Investimento mínimo: {formatCurrency(selectedPlan.minAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Retorno projetado</p>
                <p className="text-2xl font-bold text-green-600">+{formatCurrency(projectedReturn)}</p>
                <p className="text-xs text-gray-500">em {selectedPlan.period}</p>
              </div>
              <button
                onClick={handleInvestNow}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-all hover:scale-105 hover:shadow-xl"
              >
                Investir Agora
              </button>
            </div>
          </div>
        )}

        {/* Sidebar - Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Investidores Ativos</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">12.345</p>
            <p className="text-sm text-green-600 mt-2">+23% este mês</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Total Investido</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(124500000)}</p>
            <p className="text-sm text-green-600 mt-2">+15.3% este mês</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Taxa de Sucesso</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">98.5%</p>
            <p className="text-sm text-gray-600 mt-2">Investidores satisfeitos</p>
          </div>
        </div>

        {/* Payment Modal */}
        {isModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Completar Investimento</h3>
                      <p className="text-sm text-gray-500">Envie o pagamento para o endereço abaixo</p>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Investment Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Plano</p>
                        <p className="text-lg font-bold text-gray-900">{selectedPlan.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Valor</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedPlan.minAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Ativo</p>
                        <div className="flex items-center">
                          <div className={`w-6 h-6 ${selectedAssetData?.bg} rounded-lg flex items-center justify-center mr-2`}>
                            <span className={`text-xs font-bold ${selectedAssetData?.textColor}`}>{selectedAssetData?.icon}</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">{selectedAsset}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Retorno Estimado</p>
                        <p className="text-lg font-semibold text-green-600">+{formatCurrency(projectedReturn)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Address */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Envie {selectedAsset} para este endereço
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={walletAddress}
                        readOnly
                        className="w-full px-4 py-4 pr-24 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                        <button
                          onClick={() => handleCopyAddress(walletAddress)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          {copied ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        <a
                          href="#"
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-5 h-5 text-gray-600" />
                        </a>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Envie exatamente {formatCurrency(selectedPlan.minAmount)} em {selectedAsset}
                    </p>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <span className="text-xs text-gray-400 text-center">
                        Escaneie o QR
                        <br />
                        para pagar
                      </span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Instruções de Pagamento
                    </h4>
                    <ol className="text-sm text-yellow-700 space-y-2 list-decimal list-inside">
                      <li>Copie o endereço da carteira acima</li>
                      <li>Envie exatamente {formatCurrency(selectedPlan.minAmount)} em {selectedAsset}</li>
                      <li>Aguarde 3 confirmações na blockchain</li>
                      <li>Seu investimento será creditado automaticamente</li>
                      <li>Os rendimentos começarão após a confirmação</li>
                    </ol>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Confirmo que li e concordo com os 
                      <a href="#" className="text-blue-600 hover:text-blue-700 mx-1">termos e condições</a>
                      do plano {selectedPlan.name}.
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handlePaymentConfirmed}
                      disabled={!agreeToTerms || isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                          Processando...
                        </span>
                      ) : (
                        'Confirmar Investimento'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invest;